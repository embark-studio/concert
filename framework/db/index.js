const {migrate, seed, query} = require('../lib/db')

const action = {
    type: process.argv[2],
    payload: process.argv.slice(2, process.argv.length)
}

if(['db:migrate', 'db:rollback'].includes(action.type)){
    (async()=>{
        await migrate(action)
        process.exit();
    })()
}

if(['db:seed'].includes(action.type)){
    (async()=>{
        await seed(action);
        process.exit();
    })()
}

if(['db:reset'].includes(action.type)){
    (async function(){
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';

        try{
            await query.utils.danger.reset();
            await migrate({...action, type: 'db:migrate'});
            await seed({...action, action: 'db:seed'});
        }catch(error){
            console.log(error)
        }
        process.exit();
    })()
}