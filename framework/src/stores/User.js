
const Model = require('./base')

class User extends Model {
  constructor(values = {}){
    super()
    this.id = values.id
    this.email = values.email,
    this.firstName = values.firstName,
    this.lastName = values.lastName
  }
} 

module.exports = User