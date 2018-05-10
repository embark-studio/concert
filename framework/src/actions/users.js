const {User} = require('../models')
const match = require('url-pattern-match')
const strongParams = require('../params')

module.exports = async ({type: [method, ...url], payload})=>{
    const [
        resource,
        id
    ] = url;
    
    try{
        if(resource === 'users'){
            if(method === "get"){
                if(id){
                    return await User.find(id)
                }else{
                    return await User.all()
                }
            }
            if(method == 'post'){
                return await User.create(
                    strongParams.users(payload)
                )
            }
        }
    }catch(error){
        console.error(error)
        return false
    }

    return false;
}