module.exports = async (action)=>{
    if(action.type === "get"){
        return {
            example: "REGARDS"
        }
    }else{
        return {
            example: "DEFAULT ABC"
        }
    }
    return false;
}