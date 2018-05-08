// const options = require('./config/server')

// const express = require('express');
// const _app = require('./src/app')
// const app = express()

// var bodyParser = require('body-parser');
// app.use(bodyParser.json())
// app.use(function (req, res, next) {
//     res.header('Content-Type',options.contentType || 'application/json');
//     next();
// });

// app.use('*', _app(express()))
// app.listen(options.port || 3000);
const router = require('./router')

const http = require('http')
let chunks;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    req.on('data', (chunk) => {
        chunks = chunks || ""
        chunks += chunk
    });
    req.on('end', async() => {
        try{
            req.body = JSON.parse(chunks || '{}')
        }catch(error){
            console.log(error)
        }

        res.send = (data)=>{
            res.end(data ? JSON.stringify(data, null, 4) : ''); 
        }
        
        await router(req, res)
        res.end()
    });
});
server.listen(8000);