
actions = require('./actions')
const types = [
    'get',
    'put',
    'post',
    'delete'
]
module.exports = function(app){
    types.forEach((type)=>{
        Object.keys(actions).forEach((path)=>{
            app[type](path, async function(req, res){
                let response;
                try{
                    response = await actions[path]({
                        type,
                        payload: {
                            path,
                            params: req.params,
                            body: req.body,
                            query: req.query
                        }
                    })
                }catch(error){
                    res.status(500).send(error)
                }
    
                if(response){
                    if(response.status){
                        res.status(response.status)
                        res.json(response.body);
                    }else{
                        res.status(200)
                        res.json(response);
                    }
                }else{
                    res.status(404)
                }
            });
        })
    })

    return app;
}