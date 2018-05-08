module.exports = {
    where: (values, args = [])=>{
        if(Array.isArray(values)){
            return [
                values.join(' AND '),
                []
            ]
        }else if(typeof values == 'object'){
            return [
                Object.keys(values).map((key, i)=>{
                    args.push(values[key])
                    return `"${key}"=$${args.length}`
                }).join(' AND '),
                args
            ]
        }
    }
}