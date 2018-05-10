## Create Table
```javascript
module.exports = {
    up: function(execute){
        return execute.createTable('projects', {
            id: 'uuid',
            name: 'string',
            description: 'text',
        })
    },
    down: function(execute){
        return execute(
            `DROP TABLE projects;`
        )
    }
};
```

## Alter Table
### Add Column
```javascript
module.exports = {
    up: function(execute){
        return execute.addColumn(
            'projects', 'name', 'strings'
        )
    },
    down: function(execute){
        return execute.removeColumn(
            'projects', 'name'
        )
    }
};
```

### Remove Column
```javascript
module.exports = {
    up: function(execute){
        return execute.removeColumn(
            'projects', 'name'
        )
    },
    down: function(execute){
        return execute.addColumn(
            'projects', 'name', 'string'
        )
    }
};
```

### Rename Column
```javascript
module.exports = {
    up: function(execute){
        return execute.renameColumn(
            'projects', 'name', 'description'
        )
    },
    down: function(execute){
        return execute.renameColumn(
            'projects', 'description', 'name'
        )
    }
};
```

### Change Column
```javascript
module.exports = {
    up: function(execute){
        return execute.changeColumn(
            'projects', 'name', 'text'
        )
    },
    down: function(execute){
        return execute.changeColumn(
            'projects', 'description', 'string'
        )
    }
};
```

