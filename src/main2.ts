const express = require('express');
const app = express();
const cors = require('cors');
// const bodyParser = require ('body-parser');

const PORT: string = process.env.PORT || '4000';
const MAIN_NAME: string = 'database-api'
// const BASE_URL: string = `/${ MAIN_NAME }`;
// const BASE_API: string = `/${ MAIN_NAME }/api`;
// const GET_URL_LIST = [
//     { 
//         url: `${ BASE_API }/get-any`, 
//         isError: false, 
//         callback: getAny
//     },
//     { 
//         url: `${ BASE_API }/get-all`, 
//         isError: false, 
//         callback: getAll
//     },
//     { url: `${ BASE_API }/*`, isError: true },
//     { url: `${ BASE_API }`, isError: true },
//     { url: `${ BASE_URL }`, isError: true },
//     { url: `/*`, isError: true }
// ];
// const POST_URL_LIST = [
//     { 
//         url: `${ BASE_API }/users/create-new`, 
//         isError: false, 
//         callback: createNewUser
//     }
// ];

// const registerCall = ( url ) => {
//     console.log(`${ MAIN_NAME } was called by the browser with the address '${ url }'
//         * ${ MAIN_NAME } is listen on port ${ PORT }.
//         ** press Ctrl+C to stop.
//     `);
// }
// const errorResult = ( url ) => {
//     return `${ url } was selected. This is an error`;
// }
// function getAll() {
//     console.log('getAll was called.');
//     return 'get all result';
// }
// function getAny() {
//     console.log('getAny was called.');
//     return 'get any result';
// }
// function createNewUser() {
//     return 'user created';
// }

// console.log( `
//     urls available: ${ GET_URL_LIST.length }
//     url list: ${ GET_URL_LIST.map( res => '\n\t\'' + res.url + '\'' ) }`
// );

// for (let i = 0 ; i < GET_URL_LIST.length ; i++) {
//     const _url: string = GET_URL_LIST[i].url;
//     const _isError: boolean = GET_URL_LIST[i].isError;

//     app.use(_url, (req, res) => {
//         registerCall( _url );
//         if ( _isError )
//             res.status(400).send( errorResult(_url) );
        
//         const _result = GET_URL_LIST[i].callback();
//         res
//             .type('json')
//             .status(200)
//             .json(
//                 { res: _result }
//             );
//     });
//     // app.get('/', (req, res) => { /* */ })
//     // app.post('/', (req, res) => { /* */ })
//     // app.put('/', (req, res) => { /* */ })
//     // app.delete('/', (req, res) => { /* */ })
//     // app.patch('/', (req, res) => { /* */ })
// }

// app.use('/database-api/api/users/test-api', (req, res) => {
//     res.send('test ok');
// })

app.use(cors);

app.get('/', (req, res) => {
    console.log('/ received');
    res.send('Hello World!');
});
app.get('/book', (req, res) => {
    console.log('/book (get) received');
    res.send('Hello BOOK! (get)');
});
app.post('/book', (req, res) => {
    console.log('/book (post) received');
    
    res.send('Hello BOOK! (post)');
});

// app.get('/book', (req, res) => {
//     res.send('Get a random book')
// });
// app.post('/book', (req, res) => {
//     res.send('Add a book')
// });
//   .put(function (req, res) {
//     res.send('Update the book')
//   })
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));
// app.post('/database-api/api/users/create-new', (req, res) => {
//     console.log(req.body);
//     res.send('ok');
// });
// for (let i = 0 ; i < POST_URL_LIST.length ; i++) {
//     const _url: string = POST_URL_LIST[i].url;
//     const _isError: boolean = POST_URL_LIST[i].isError;

//     app.post(_url, (req, res) => {
//         registerCall( _url );
//         if ( _isError )
//             res.status(400).send( errorResult(_url) );
        
//         console.log(req.body);
//         res.send('ok');
//         // const _result = GET_URL_LIST[i].callback();
//         // res
//         //     .type('json')
//         //     .status(200)
//         //     .json(
//         //         { res: _result }
//         //     );
//     });
//     // app.get('/', (req, res) => { /* */ })
//     // app.post('/', (req, res) => { /* */ })
//     // app.put('/', (req, res) => { /* */ })
//     // app.delete('/', (req, res) => { /* */ })
//     // app.patch('/', (req, res) => { /* */ })
// }

app.listen(PORT, () => {
    console.log(`* ${ MAIN_NAME } is listen on port ${ PORT }.
** press Ctrl+C to stop.`);
});