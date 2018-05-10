module.exports = async(execute, faker)=>{
    
    try{
        for(let i=0; i < 10; i++){
            const [email] = faker.internet.email().split('@')
            const fakeEmail = (
                process.env.TEST_EMAIL || 'test@nextinline.io'
            ).replace('@', `+${email}@`)
            
            await execute.create('users', {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: fakeEmail
            })
        }
    }catch(error){
        console.log(error)
    }
}