const base = require('../lib/tests')
process.env.NODE_ENV = 'test'

const bootstrap = async()=>{
    if(process.env.WATCH === 'true'){
        base()
    }else{
        process.exit(await base() ? 0 : 1);
    }
}


bootstrap()