const root = require('./root')
const users = require('./users')
const projects = require('./projects')
module.exports = async (action)=>{
    return (
        await users(action) ||
        await projects(action) ||
        await root(action)
    )
}