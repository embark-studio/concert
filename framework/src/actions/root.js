module.exports = async ({type, payload})=>{
    const [
        method,
        resource
    ] = type;
    
    if(method === "get" && resource == ''){
        return {
            rels: {
                method: 'get',
                path: '/users'
            }
        }
    }
    
    return false;
}