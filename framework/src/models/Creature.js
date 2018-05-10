const Model = require('../../lib/model');
class Creature extends Model {
     constructor (values){
         super() 
        this.id = values.id, 
        this.dave = values.dave, 
        this.createdAt = values.createdAt, 
        this.updatedAt = values.updatedAt
    }
}
module.exports = Creature