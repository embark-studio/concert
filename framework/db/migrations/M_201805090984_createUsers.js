module.exports = {
    up: function(execute){
        return execute.createTable('users', {
            firstName: 'string',
            lastName: 'string',
            email: 'string'
        })
    },
    down: function(execute){
        return execute.dropTable('users')
    }
};