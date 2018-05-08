module.exports = {
    up: function(execute){
        return execute(`
            CREATE TABLE users (
                id varchar(36),
                "firstName" varchar(255),
                "lastName" varchar(255),
                "email" varchar(255),
                "createdAt" timestamp,
                "updatedAt" timestamp
            )
        `)
    },
    down: function(execute){
        return execute(
            `DROP TABLE users;`
        )
    }
};