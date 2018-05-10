module.exports = {
    where: (values, args = [])=>{
        if(Array.isArray(values)){
            return [
                values.join(' AND '),
                args
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
    },
    insert: (values, args)=>{
        if(typeof values == 'object'){
            return [
                args.concat(Object.values(values)),
                `("${Object.keys(values).join('", "')}") VALUES ("${values.map((_value)=> Object.values(_value) )}")`
            ]
        }
    }
}