// import * as users from 'data/users.json';
// import someObject from ('./data/users.json');
const express = require('express');
const app = express();
let users = require('./data/users.json');

const PORT: string = process.env.PORT || '4000';
const MAIN_NAME: string = 'database-api'
const BASE_URL: string = `/${ MAIN_NAME }`;
const BASE_API: string = `/${ MAIN_NAME }/api`;
const GET_URL_LIST = [
    { 
        url: `${ BASE_API }/get-all-users`, 
        isError: false, 
        callback: getUsers
    },
    { 
        url: `${ BASE_API }/get-user-by-id/:arg1`, 
        isError: false, 
        callback: getUserbyId
    },
    { 
        url: `${ BASE_API }/get-user-by-username/:arg1`, 
        isError: false, 
        callback: getUserbyUsername
    },
    { 
        url: `${ BASE_API }/get-any`, 
        isError: false, 
        callback: getAny
    },
    { 
        url: `${ BASE_API }/get-all`, 
        isError: false, 
        callback: getAll
    },
    { url: `${ BASE_API }/*`, isError: true },
    { url: `${ BASE_API }`, isError: true },
    { url: `${ BASE_URL }`, isError: true },
    { url: `/*`, isError: true }
];
const POST_URL_LIST = [
    { 
        url: `${ BASE_API }/users/add-user`, 
        isError: false, 
        callback: addUser
    }
];
const registerCall = ( url: string, args? : any ) => {
    console.log(`address '${ url }' was called`);
    if (args) console.log('args: %o', args);
};
const errorResult = ( url: string ) => {
    return `${ url } was selected. This is an error`;
};
const getNewId = () => {
    let id: number = 0;
    for (let i=0 ; i< users.length ; i++) {
        id = users[i].id > id ? users[i].id : id;
    }
    return id + 1;
};
const returnSpecificUserValue = (key: string, value: any): any => {
    for (let i = 0 ; i <  users.length ; i++) {
        if (users[i][key] == value) return users[i];
    }
    return null;
}

// CALLBACK METHODS
function getUsers(args?: any): any {
    return users;
}
function getUserbyId(id: number): any {
    console.log('result: %o', returnSpecificUserValue('id', id));
    return returnSpecificUserValue('id', id);
}
function getUserbyUsername(username: string): any {
    return returnSpecificUserValue('username', username);
}
function getAll(args?: any) {
    console.log('getAll was called.');
    if (args) console.log(`args: '${ args }'`);
    console.log('\n');
    return 'get all result';
}
function getAny(args?: any) {
    console.log('getAny was called.');
    if (args) console.log(`args: '${ args }'`);
    console.log('\n');
    return 'get any result';
}
function addUser(data: any): string {
    // check empty
    if (Object.keys(data).length < 1) {
        console.log('addUser() . argument \'data\' is empty');
        return 'the data is empty';
    }
    // check incorrect data
    if (
        !data['firstname'] || data['firstname'] == '' ||
        !data['lastname'] || data['lastname'] == '' ||
        !data['username'] || data['username'] == ''
    ) {
        console.log('addUser() . argument \'data\' has missing or incorrect keys');
        return '\'data\' has missing or incorrect keys';
    }

    let newUser: object = {
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
app.use(express.json())


// GET
console.log( `
    GET URLs available: ${ GET_URL_LIST.length }
    GET URLs list: ${ GET_URL_LIST.map( res => '\n\t\'' + res.url + '\'' ) }`
);
for (let i = 0 ; i < GET_URL_LIST.length ; i++) {
    const _url: string = GET_URL_LIST[i].url;
    const _isError: boolean = GET_URL_LIST[i].isError;

    app.get(_url, (req: any, res: any) => {
        registerCall( _url, req.body );
        if ( _isError ) {
            res.status(400).send( errorResult(_url) );
            return;
        }

        console.log(req.params.arg1);
        const _result = GET_URL_LIST[i].callback( req.params.arg1 );
        res
            .type('json')
            .status(200)
            .json(
                { res: _result }
            );
    });
    // app.get('/', (req, res) => { /* */ })
    // app.post('/', (req, res) => { /* */ })
    // app.put('/', (req, res) => { /* */ })
    // app.delete('/', (req, res) => { /* */ })
    // app.patch('/', (req, res) => { /* */ })
}

// POST
console.log( `
    POST URLs available: ${ POST_URL_LIST.length }
    POST URLs list: ${ POST_URL_LIST.map( res => '\n\t\'' + res.url + '\'' ) }`
);
for (let i = 0 ; i < POST_URL_LIST.length ; i++) {
    const _url: string = POST_URL_LIST[i].url;
    const _isError: boolean = POST_URL_LIST[i].isError;

    app.post(_url, (req: any, res: any) => {
        registerCall( _url, req.body );
        if ( _isError ) {
            res.status(400).send( errorResult(_url) );
            return;
        }

        const _result = POST_URL_LIST[i].callback( req.body );
        const _status = _result === 'success' ? 200 : 400;
        res.statusMessage = _result;
        res
            .status(_status)
            .json(
                { res: _result }
            );
    });
}

app.post('/book', (req, res) => {
    console.log('/book (post) received. data: %o', req.body);
    res.status(200).send({'result': 'Hello BOOK! (post)'});
});

app.listen(PORT, () => {
    console.log(`* ${ MAIN_NAME } is listen on port ${ PORT }.
** press Ctrl+C to stop.`);
});