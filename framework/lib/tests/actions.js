const actions = require('../../tests/actions')
const app = require('../../src')
const {query} = require('../db')
const differ = require('./diff')
const setup = require('./setup')

module.exports = async()=>{
    console.log("Actions:")
    let failed = 0
    try{
        for(let i=0; i < actions.length; i++){
            await setup.each()
    
            const test = await actions[i](query)
            
            const response = await app.actions(test.action)
            
            if(typeof test.response == 'function'){
                test.response = await test.response()
            }
    
            const diff = differ(
                JSON.parse(JSON.stringify(response)), 
                JSON.parse(JSON.stringify(test.response))
            )

            if(diff.matches){
                console.log(`${test.name} - Passed`)
            }else{
                console.log(`${test.name} - Failed`)
                diff._print()
                console.log('')
                failed = failed + 1
            }
        }



    
        if(failed !== 0){
            console.log(`${failed} Actions Failed!`)
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
    

    return true
}
