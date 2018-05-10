const {query, migrate} = require('../db')

module.exports = {
    each: async()=>{
        await query.utils.danger.reset({silent: true})
        return await migrate({
            type: 'db:migrate',
            silent: true
        })
    }
}