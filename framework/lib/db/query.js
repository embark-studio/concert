
const { Pool } = require('pg')
const config = require('../../config/database')
const uuidv4 = require('uuid/v4');

const pool = new Pool({
    ...config[process.env.NODE_ENV || 'development']
})

function execute(q, a){
    return pool.query(q, a)
}

const processArg = (arg)=>{ 
    return {
        string: 'varchar(255)',
        uuid: 'varchar(36)',
    }[arg] || arg
}

execute.pool = pool;
execute.createTable  = function(name, options){
    return execute(`
        CREATE TABLE "${name}" (
            ${Object.keys(options).map((key,i)=>
                `"${key}" ${processArg(options[key])}`
            ).concat([
                `id ${processArg('uuid')}`,
                '"createdAt" timestamp',
                '"updatedAt" timestamp',
                "archived boolean"
            ]).join(",")}
        )
    `)
}

execute.dropTable = function(name){
    return execute(`DROP TABLE "${name}"`)
}

execute.alterTable = function(name, changes = {}){
    const table = [`ALTER TABLE "${name}"`]
    (Object.keys(changes.add || {})).each((changeKey)=>{
        table.push(`ADD "${changeKey}" ${processArg(changes[changeKey])}`)
    })
    
    (Object.keys(changes.rename || {})).each((changeKey)=>{
        table.push(`RENAME COLUMN  "${changeKey}" ${processArg(changes[changeKey])}`)
    })
    
    (Object.keys(changes.CHANGE || {})).each((changeKey)=>{
        table.push(`ALTER COLUMN  "${changeKey}" TYPE ${processArg(changes[changeKey])}`)
    })

    (changes.remove || []).forEach((changeKey)=>{
        table.push(`DROP COLUMN "${changeKey}"`)
    })

    return execute(`ALTER TABLE "${table.join('\n')}"`);
}

execute.addColumn = function(tableName, columnName, type){
    return execute.alterTable(tableName, {add: {[`${columnName}`]: type}})
}

execute.removeColumn = function(tableName, columnName, type){
    return execute.alterTable(tableName, {remove: [columnName]})
}

execute.renameColumn = function(tableName, columnName, type){
    return execute.alterTable(tableName, {rename: {[`${columnName}`]: type}})
}

execute.changeColumn = function(tableName, columnName, type){
    return execute.alterTable(tableName, {rename: {[`${columnName}`]: type}})
}
execute.utils = {
    create: async function(tableName, data = {}){
        data.id = uuidv4()
        return (
            await execute(
                `INSERT INTO "${tableName}"("${Object.keys(data).join('", "')}") VALUES(${Object.keys(data).map((_, i)=> `$${i + 1}`).join(', ')}) returning *`,
                Object.values(data)
            )
        ).rows[0]
    },
    danger: {
        reset: function({silent} = {}){
            if(process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development'){
                if(!silent){
                    console.log('Clearing Database')
                }
                return execute(`
                    DO $$ DECLARE
                    tabname RECORD;
                    BEGIN
                    FOR tabname IN (SELECT tablename 
                        FROM pg_tables 
                        WHERE schemaname = current_schema()) 
                        LOOP
                        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(tabname.tablename) || ' CASCADE';
                        END LOOP;
                        END $$
                `)

            }else{
                const stop = `
                    STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP
                    STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP

                    You tried to reset the database while not in test or development mode!
        
                    STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP
                    STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP
                `
                console.log(stop)
                throw stop
            }
        }
    },
    execute
}
module.exports = execute