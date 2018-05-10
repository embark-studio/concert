module.exports = {
    up: function(execute){
        return execute.createTable('projects', {
            name: 'string',
            description: 'text',
        })
    },
    down: function(execute){
        return execute.dropTable('projects')
    }
};