const fs = require('fs')
const moment = require('moment')
const _ = require('lodash')

module.exports = function(name){
    let args = [].slice.call(arguments)
    
    args = args.slice(1, args.length)



    const date = moment().format('YYYYMMDDssSS')
    const migrationName = `M_${date}_${_.camelCase(name)}`
    const text = [
        'module.exports = {',
        '    up: function(execute){',
        '        ',
        '    },',
        '    down: function(execute){',
        '        ',
        '    }',
        '};'
    ].join('\n')

    fs.writeFileSync(`./db/migrations/${migrationName}.js`, text)

    const index = fs.readFileSync(`./db/migrations/index.js`, 'utf8')
    const _index = require(`${process.cwd()}/db/migrations`)

    const [start, end] = index.split("module.exports")
    
    _index.push({
        description: 'TODO: Describe what this does',
        migrate: '', id: migrationName
    })
    fs.writeFileSync('./db/migrations/index.js', [
        `const ${migrationName} = require(./'${migrationName}');\n${start}`,
        'module.exports = [',
        _index.map((item)=>[
            '    {',
            `        description: "${item.description}",`,
            `        migrate: ${item.id}, id: "${item.id}"`,
            '    }'
        ].join('\n')).join(',\n'),
        ']'
    ].join('\n'))


    return true;
}