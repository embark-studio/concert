const fs = require('fs')
module.exports = function(name){
    let args = [].slice.call(arguments)
    
    args = args.slice(1, args.length)
    const value = [
        `const Model = require('./base');`,
        `class ${name} extends Model {`,
        `     constructor (values){`,
        '         super() ',
            args.map((arg)=>{
                return `        this.${arg} = values.${arg}`
            }).join(', \n'),
        '    }',
        '}',
        `module.exports = ${name}`,
    ].join("\n")

    fs.writeFileSync(`./src/stores/${name}.js`, value)
    const values =  fs.readdirSync('./src/stores').reduce((values, file)=> {
        if(file.includes(".js") && file !== 'index.js'){
            return [
                file.replace(".js", ""),
                ...values
            ]
        }
        
        return values;
    }, [])
    
    const index = [
        ... values.map((store)=>(
            `const ${store} = require('./${store}')`
        )),
        '',
        'module.exports = {',
        values.map((store)=>
            `   ${store}`
        ).join(',\n'),
        '}'
    ].join("\n")



    
    fs.writeFileSync('./src/stores/index.js', index)


    return value;
}