
const Store = require('../../lib/model')

class User extends Store {
  constructor(values = {}){
    super()
    this.id = values.id
    this.email = values.email,
    this.firstName = values.firstName,
    this.lastName = values.lastName,
    this.createdAt = values.createdAt,
    this.updatedAt = values.updatedAt
  }
} 

module.exports = User