const migrations = require('./db/migrations')

const { Pool } = require('pg')
const config = require('./config/database')
const pluralize = require('pluralize')
const uuidv4 = require('uuid/v4');

const pool = new Pool({
    ...config
})

async function migrate(){
    await pool.query(`
    CREATE TABLE IF NOT EXISTS "schemaMigrations" (
        "migrationID" VARCHAR(36),
        "migratedAt" TIMESTAMP,
        current BOOLEAN
    );
    `)

    const _migrations = (
        await pool.query('SELECT * FROM "schemaMigrations";')
    ).rows

    let direction;
    switch(process.argv[2]){
        case 'db:migrate':
            direction = 'up'
            break;
        case 'db:rollback':
            direction = 'down'
            break;
    }

    const execute = (q, a)=> pool.query(q, a)

    if(direction === 'up'){
        await pool.query(`UPDATE "schemaMigrations" SET current=FALSE`)   
        for(let i=0; i < migrations.length; i++){
            const migration = migrations[i]
            
            let shouldProcess = _migrations.find((_migration)=>_migration.migrationID === migration.id)
    
            if(!shouldProcess){
                console.log('Processing migration ', migration.name, ' ', migration.id)
                try{
                    await migration.migrate.up(execute)
                    await pool.query(`INSERT INTO "schemaMigrations" ("migrationID", "migratedAt") VALUES ($1, NOW());`, [migration.id])
                }catch(error){
                    console.log(error)
                }
            }else{
                console.log('Skipping migration ', migration.name, ' ', migration.id)
            }
    
            if(i === migrations.length - 1){
                try{
                    await pool.query(`UPDATE "schemaMigrations" SET current=TRUE WHERE "migrationID"=$1`, [migration.id])   
                }catch(error){
                    console.log(error)
                }
            }
    
        }
    }else if(direction === 'down'){
        let _migration;
        try{
            _migration = (await pool.query('SELECT * FROM "schemaMigrations" WHERE current = true')).rows[0]
        }catch(error){
            console.log(error)
        }
        
        if(_migration){
            const migrationIDs = migrations.map((migration)=> migration.id )
            const index = migrationIDs.indexOf(_migration.migrationID);
            
    
            const migration = migrations[index];
    
            console.log('Rolling back migration ', migration.name, ' ', migration.id)

            await migration.migrate.down(execute)
            await execute('DELETE from "schemaMigrations" WHERE "migrationID"=$1', [_migration.migrationID])
            try{
                await pool.query(`UPDATE "schemaMigrations" SET current=FALSE`)   
            }catch(error){
                console.log(error)
            }
            const currentMigration = migrations[index - 1]
    
            try{
                if(currentMigration){
                    await pool.query(`UPDATE "schemaMigrations" SET current=TRUE WHERE "migrationID"=$1`, [currentMigration.id])   
                }
            }catch(error){
                console.log(error)
            }
        }else{
            console.log('No migrations left to rollback')
        }
    }

    process.exit();
    return false;
}
    
migrate()