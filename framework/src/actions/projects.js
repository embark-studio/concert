const {Project} = require('../models')
const match = require('url-pattern-match')
const strongParams = require('../params')

module.exports = async ({type: [method, ...url], payload})=>{
    const [
        resource,
        id
    ] = url;
    
    try{
        if(resource === 'projects'){
            if(method === "get"){
                if(id){
                    return await Project.find(id)
                }else{
                    return await Project.all()
                }
            }
            if(method == 'post'){
                return await Project.create(
                    strongParams.projects(payload)
                )
            }
            if(method == 'put'){
                return new Project({
                    createdAt: "the Created At",
                    updatedAt: "the Created At",
                    id: "the id",
                    name: "the name",
                    description: "the description",
                })
            }
        }

    }catch(error){
        console.error(error)
        return false
    }

    return false;
}