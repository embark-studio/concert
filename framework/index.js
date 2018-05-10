const router = require('./router');
const storeBaseHelpers = require('src/stores/base/helpers');
const http = require('http');
let chunks;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    req.on('data', (chunk) => {
        chunks = chunks || "";
        chunks += chunk;
    });
    req.on('end', async() => {
        try{
            req.body = JSON.parse(chunks || '{}');
        }catch(error){
            console.log(error);
        }

        res.send = (data)=>{
            res.end(data ? JSON.stringify(data, null, 4) : '');
        }
        
        await router(req, res);
        res.end()
    });
});
server.listen(8000);