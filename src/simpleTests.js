var express = require('express');
var app = express();
// const cors = require('cors');
// const bodyParser = require ('body-parser');
var PORT = process.env.PORT || '4000';
var MAIN_NAME = 'database-api';
// app.use(cors);
// app.use(bodyParser);
app.use(express.json());
app.get('/', function (req, res) {
    console.log('/ received');
    res.send({ 'result': 'Hello World!' });
});
app.get('/book', function (req, res) {
    console.log('/book (get) received');
    res.status(200).send({ 'result': 'Hello BOOK! (get)' });
});
app.post('/book', function (req, res) {
    console.log('/book (post) received. data: %o', req.body);
    res.status(200).send({ 'result': 'Hello BOOK! (post)' });
});
app.listen(PORT, function () {
    console.log("* " + MAIN_NAME + " is listen on port " + PORT + ".\n** press Ctrl+C to stop.");
});
