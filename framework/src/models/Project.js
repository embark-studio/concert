const Store = require('../../lib/model');
class Project extends Store {
     constructor (values){
         super() 
        this.id = values.id, 
        this.name = values.name, 
        this.description = values.description, 
        this.createdAt = values.createdAt, 
        this.updatedAt = values.updatedAt
    }
}
module.exports = Project