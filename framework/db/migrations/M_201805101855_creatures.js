module.exports = {
    up: function(execute){
        return execute.createTable('creatures', {
            dave: 'string'
        })
    },
    down: function(execute){
        return execute.dropTable('creatures')
    }
};