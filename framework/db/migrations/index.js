const M_201805101855_creatures = require('./M_201805101855_creatures');
const M_201805093076_createProfiles = require('./M_201805093076_createProfiles')
const M_201805090984_createUsers = require('./M_201805090984_createUsers')






module.exports = [
    {
        description: "description",
        migrate: M_201805090984_createUsers, id: "M_201805090984_createUsers"
    },
    {
        description: "description",
        migrate: M_201805093076_createProfiles, id: "M_201805093076_createProfiles"
    },
    {
        description: "TODO: Describe what this does",
        migrate: M_201805101855_creatures, id: "M_201805101855_creatures"
    }
]