const execute = require('./query')
const pool = execute.pool;
const faker = require('faker')

const seeds = require('../../db/seeds')

const seed = async function(){
    console.log(`Processing ${seeds.length} Seed(s)`)
    for(let i=0; i < seeds.length; i++){
        const seed = seeds[i];
        await seed(execute.utils, faker)
    }

    return false;
}

module.exports = seed;
