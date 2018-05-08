const {actions} = require('./src')
module.exports = async(req, res)=>{
    let response;
    try{
        const url = req.url.slice(1, req.url.length)
        response = await actions({
            type: [req.method.toLowerCase(), ...url.split('/')],
            payload: req.body
        })
    }catch(error){
        res.statusCode = 500
        res.statusMessage = error
    }

    if(response){
        if(response.status){
            res.statusCode = response.status
            res.send(response.body);
        }else{
            res.statusCode = 200
            res.send(response);
        }
    }else{
        res.statusCode = 404
        res.send()
    }
}