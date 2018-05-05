module.exports = async (action)=>{
    if(action.type === "get"){
        return {
            example: "REGARDS A"
        }
    }
    return false;
}