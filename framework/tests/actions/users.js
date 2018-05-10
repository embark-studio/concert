require('faker')
module.exports = [
    async(execute)=>{
        const user = await execute.utils.create('users', {
            firstName: "Carson",
            lastName: "Wright",
            email: 'johndoe@example.com'
        })
        return {
            name: "Fetch All Users",
            action: {
                type: ['get', 'users'],
                payload: {}
            },
            response: [{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }]
        }
    }
]