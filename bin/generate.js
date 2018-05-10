#! /usr/bin/env node

const copydir = require('copy-dir')
const fs = require('fs')
const path = require('path')
const [command, generator] = process.argv.slice(2, process.argv.length)
const generators = require('./generators')
switch(command){
    case 'new':
        const target = path.join(process.cwd(), generator)
        copydir.sync(path.join(__dirname, '../framework'), target);
        
        process.chdir(`./${generator}`)

        const package = JSON.parse(fs.readFileSync('package.json'))
        
        package.name = generator
        
        fs.writeFileSync('package.json', JSON.stringify(package, null, 4))

        break;
    case 'generate':
        generators[generator](...process.argv.slice(4, process.argv.length))
        break;
}