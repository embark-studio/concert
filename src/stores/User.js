
const Model = require('./database')

class User extends Model {
  static schema(schema){
    return {
      id: {
        primaryKey: true,
        type: schema.INTEGER
      },
      email: schema.STRING,
      firstName: schema.STRING,
      lastName: schema.STRING
    }
  }
} 

module.exports = User