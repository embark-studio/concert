const fs = require('fs')
module.exports = function(name){
    let args = [].slice.call(arguments)
    
    args = args.slice(1, args.length);
    args = ['id', ...args, 'createdAt', 'updatedAt']
    const value = [
        `const Model = require('../../lib/model');`,
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

    fs.writeFileSync(`./src/models/${name}.js`, value)
    

    const index = fs.readFileSync(`./src/models/index.js`, 'utf8')
    const _index = require(`${process.cwd()}/src/models`)

    const [start, end] = index.split("module.exports")
    
    _index[name] = name

    fs.writeFileSync('./src/models/index.js', [
        `const ${name} = require('./${name}');\n${start}`,
        'module.exports = {',
        Object.keys(_index).map((item)=>
            `        ${item}`
        ).join(',\n'),
        '}'
    ].join('\n'))


    return value;
}