const usersCreate = require('./usersCreate')
const projectsCreate = require('./projectsCreate')
module.exports = [
    {name: 'Users Create', migrate: usersCreate, id: '96dadf3d-43e2-40a5-a0a6-c631ae301ab1'},
    {name: 'Projects Create', migrate: projectsCreate, id: '170665a0-c39c-45ec-9ff6-20ca819dbfea'}
]