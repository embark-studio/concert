const root = require('./root')
const users = require('./users')
module.exports = {
    '/': root,
    '/users': users
}