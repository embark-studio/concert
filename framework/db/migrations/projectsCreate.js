module.exports = {
    up: function(execute){
        return execute(`
            CREATE TABLE projects (
                id varchar(36),
                "name" varchar(255),
                "description" text,
                "createdAt" timestamp,
                "updatedAt" timestamp
            )
        `)
    },
    down: function(execute){
        return execute(
            `DROP TABLE projects;`
        )
    }
};