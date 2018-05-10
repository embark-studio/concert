const migrations = require('../../db/migrations')
const execute = require('./query')
const pool = execute.pool;

async function migrate({type, silent}){
    try{
        await execute(`
            CREATE TABLE IF NOT EXISTS "schemaMigrations" (
                "migrationID" VARCHAR(36),
                "migratedAt" TIMESTAMP,
                current BOOLEAN
            );
        `)
    }catch(error){
        console.log(error)
    }

    const _migrations = (
        await execute('SELECT * FROM "schemaMigrations";')
    ).rows

    let direction;
    switch(type){
        case 'db:migrate':
            direction = 'up'
            break;
        case 'db:rollback':
            direction = 'down'
            break;
    }

    if(direction === 'up'){
        await execute(`UPDATE "schemaMigrations" SET current=FALSE`)   
        for(let i=0; i < migrations.length; i++){
            const migration = migrations[i]
            
            let shouldProcess = _migrations.find((_migration)=>_migration.migrationID === migration.id)
    
            if(!shouldProcess){
                if(!silent){
                    console.log('Processing migration ', migration.id, '  ', migration.description)
                }
                try{
                    await migration.migrate.up(execute)
                    await execute(`INSERT INTO "schemaMigrations" ("migrationID", "migratedAt") VALUES ($1, NOW());`, [migration.id])
                }catch(error){
                    console.log(error)
                }
            }else{
                if(!silent){
                    console.log('Skipping migration ', migration.id, ' ', migration.description)
                }
            }
    
            if(i === migrations.length - 1){
                try{
                    await execute(`UPDATE "schemaMigrations" SET current=TRUE WHERE "migrationID"=$1`, [migration.id])   
                }catch(error){
                    console.log(error)
                }
            }
    
        }
    }else if(direction === 'down'){
        let _migration;
        try{
            _migration = (await execute('SELECT * FROM "schemaMigrations" WHERE current = true')).rows[0]
        }catch(error){
            console.log(error)
        }
        
        if(_migration){
            const migrationIDs = migrations.map((migration)=> migration.id )
            const index = migrationIDs.indexOf(_migration.migrationID);
            
    
            const migration = migrations[index];
    
            if(!silent){
                console.log('Rolling back migration ', migration.description, ' ', migration.id)
            }

            await migration.migrate.down(execute)
            await execute('DELETE from "schemaMigrations" WHERE "migrationID"=$1', [_migration.migrationID])
            try{
                await execute(`UPDATE "schemaMigrations" SET current=FALSE`)   
            }catch(error){
                console.log(error)
            }
            const currentMigration = migrations[index - 1]
    
            try{
                if(currentMigration){
                    await execute(`UPDATE "schemaMigrations" SET current=TRUE WHERE "migrationID"=$1`, [currentMigration.id])   
                }
            }catch(error){
                console.log(error)
            }
        }else{
            if(!silent){
                console.log('No migrations left to rollback')
            }
        }
    }

    return false;
}
    
module.exports = migrate;