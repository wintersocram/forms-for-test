const express = require('express');
const app = express();
// const cors = require('cors');
// const bodyParser = require ('body-parser'); // DEPRECATED

const PORT: string = process.env.PORT || '4000';
const MAIN_NAME: string = 'database-api'

// app.use(cors);
// app.use(bodyParser); // DEPRECATED
app.use(express.json())

app.get('/', (req, res) => {
    console.log('/ received');
    res.send({'result': 'Hello World!'});
});
app.get('/book', (req, res) => {
    console.log('/book (get) received');
    res.status(200).send({'result': 'Hello BOOK! (get)'});
});
app.post('/book', (req, res) => {
    console.log('/book (post) received. data: %o', req.body);
    res.status(200).send({'result': 'Hello BOOK! (post)'});
});

app.listen(PORT, () => {
    console.log(`* ${ MAIN_NAME } is listen on port ${ PORT }.
** press Ctrl+C to stop.`);
});