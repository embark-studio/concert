const app = require('../../src');

module.exports = [
    async(execute)=>{
        const project = await execute.utils.create('projects', {
            name: "Awesome",
            description: "A really really good project"
        })

        return {
            name: "Fetch All Projects",
            action: {
                type: ['get', 'projects'],
                payload: {}
            },
            response: [{
                id: project.id,
                name: project.name,
                description: project.description,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt
            }]
        }
    },
    async()=>{

        return {
            name: "Create Project",
            action: {
                type: ['post', 'projects'],
                payload: {name: ''}
            },
            response: async()=>{
                const project = await app.models.Project.first()

                return {
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    createdAt: project.createdAt,
                    updatedAt: project.updatedAt,
                }
            }
        }
    },
    async()=>{
        return {
            name: "Update Project",
            action: {
                type: ['put', 'projects'],
                payload: {name: ''}
            },
            response: async()=>{
                
                return {
                    id: 'the id',
                    name: 'the name',
                    description: 'the description',
                    createdAt: 'the Created At',
                    updatedAt: 'the Created At',
                }
            }
        }
    }
]