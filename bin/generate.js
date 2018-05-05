#! /usr/bin/env node

const copydir = require('copy-dir')
const fs = require('fs')
const path = require('path')
copydir.sync(path.join(__dirname, '../framework'), process.cwd());

const package = JSON.parse(fs.readFileSync('package.json'))


package.name = process.cwd().split("/").reverse()[0]

fs.writeFileSync('package.json', JSON.stringify(package, null, 4))

