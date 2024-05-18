import {prisma} from '../utils.js'
const registerDb = async(firstname, lastname, email, password, userQuestion, userAnswer)=> await prisma.register.create({
    data:{
        firstname,
        lastname,
        email,
        password,
        userQuestion,
        userAnswer
    }
})

export {registerDb}