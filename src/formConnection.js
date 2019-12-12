// import * as users from 'data/users.json';
// import someObject from ('./data/users.json');
var express = require('express');
var app = express();
var users = require('./data/users.json');
var PORT = process.env.PORT || '4000';
var MAIN_NAME = 'database-api';
var BASE_URL = "/" + MAIN_NAME;
var BASE_API = "/" + MAIN_NAME + "/api";
var GET_URL_LIST = [
    {
        url: BASE_API + "/get-all-users",
        isError: false,
        callback: getUsers
    },
    {
        url: BASE_API + "/get-user-by-id/:arg1",
        isError: false,
        callback: getUserbyId
    },
    {
        url: BASE_API + "/get-user-by-username/:arg1",
        isError: false,
        callback: getUserbyUsername
    },
    {
        url: BASE_API + "/get-any",
        isError: false,
        callback: getAny
    },
    {
        url: BASE_API + "/get-all",
        isError: false,
        callback: getAll
    },
    { url: BASE_API + "/*", isError: true },
    { url: "" + BASE_API, isError: true },
    { url: "" + BASE_URL, isError: true },
    { url: "/*", isError: true }
];
var POST_URL_LIST = [
    {
        url: BASE_API + "/users/add-user",
        isError: false,
        callback: addUser
    }
];
var registerCall = function (url, args) {
    console.log("address '" + url + "' was called");
    if (args)
        console.log('args: %o', args);
};
var errorResult = function (url) {
    return url + " was selected. This is an error";
};
var getNewId = function () {
    var id = 0;
    for (var i = 0; i < users.length; i++) {
        id = users[i].id > id ? users[i].id : id;
    }
    return id + 1;
};
var returnSpecificUserValue = function (key, value) {
    console.log('returnSpecificUserValue: key: %o, value: %o', key, value);
    for (var i = 0; i < users.length; i++) {
        console.log('(%o) users[%o][%o]: %o; value: %o, test: %o', i, i, key, users[i][key], value, users[i][key] == value);
        if (users[i][key] == value) {
            console.log('\tusers[%o]: %o', i, users[i]);
            return users[i];
        }
    }
    return null;
};
// CALLBACK METHODS
function getUsers(args) {
    return users;
}
function getUserbyId(id) {
    console.log('result: %o', returnSpecificUserValue('id', id));
    return returnSpecificUserValue('id', id);
}
function getUserbyUsername(username) {
    return returnSpecificUserValue('username', username);
}
function getAll(args) {
    console.log('getAll was called.');
    if (args)
        console.log("args: '" + args + "'");
    console.log('\n');
    return 'get all result';
}
function getAny(args) {
    console.log('getAny was called.');
    if (args)
        console.log("args: '" + args + "'");
    console.log('\n');
    return 'get any result';
}
function addUser(data) {
    // check empty
    if (Object.keys(data).length < 1) {
        console.log('addUser() . argument \'data\' is empty');
        return 'the data is empty';
    }
    // check incorrect data
    if (!data['firstname'] || data['firstname'] == '' ||
        !data['lastname'] || data['lastname'] == '' ||
        !data['username'] || data['username'] == '') {
        console.log('addUser() . argument \'data\' has missing or incorrect keys');
        return '\'data\' has missing or incorrect keys';
    }
    var newUser = {
        "id": getNewId(),
        "firstname": data['firstname'],
        "lastname": data['lastname'],
        "username": data['username'],
        "password": data['password']
    };
    users.push(newUser);
    return 'success';
}
// app.use(cors);
// app.use(bodyParser); // DEPRECATED
app.use(express.json());
// GET
console.log("\n    GET URLs available: " + GET_URL_LIST.length + "\n    GET URLs list: " + GET_URL_LIST.map(function (res) { return '\n\t\'' + res.url + '\''; }));
var _loop_1 = function (i) {
    var _url = GET_URL_LIST[i].url;
    var _isError = GET_URL_LIST[i].isError;
    app.get(_url, function (req, res) {
        registerCall(_url, req.body);
        if (_isError) {
            res.status(400).send(errorResult(_url));
            return;
        }
        console.log(req.params.arg1);
        var _result = GET_URL_LIST[i].callback(req.params.arg1);
        res
            .type('json')
            .status(200)
            .json({ res: _result });
    });
};
for (var i = 0; i < GET_URL_LIST.length; i++) {
    _loop_1(i);
}
// POST
console.log("\n    POST URLs available: " + POST_URL_LIST.length + "\n    POST URLs list: " + POST_URL_LIST.map(function (res) { return '\n\t\'' + res.url + '\''; }));
var _loop_2 = function (i) {
    var _url = POST_URL_LIST[i].url;
    var _isError = POST_URL_LIST[i].isError;
    app.post(_url, function (req, res) {
        registerCall(_url, req.body);
        if (_isError) {
            res.status(400).send(errorResult(_url));
            return;
        }
        var _result = POST_URL_LIST[i].callback(req.body);
        var _status = _result === 'success' ? 200 : 400;
        res.statusMessage = _result;
        res
            .status(_status)
            .json({ res: _result });
    });
};
for (var i = 0; i < POST_URL_LIST.length; i++) {
    _loop_2(i);
}
app.post('/book', function (req, res) {
    console.log('/book (post) received. data: %o', req.body);
    res.status(200).send({ 'result': 'Hello BOOK! (post)' });
});
app.listen(PORT, function () {
    console.log("* " + MAIN_NAME + " is listen on port " + PORT + ".\n** press Ctrl+C to stop.");
});
