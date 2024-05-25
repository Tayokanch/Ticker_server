import {prisma} from '../utils.js'
const registerDb = async(firstname, lastname, email, password, userQuestion, userAnswer)=> await prisma.user.create({
    data:{
        firstname,
        lastname,
        email,
        password,
        userQuestion,
        userAnswer
    }
})


const ticketsDb = async (ticketLocation, ticketDestination, price, description, userId)=> await prisma.tickets.create({
    data:{
        ticketLocation,
        ticketDestination,
        price,
        description,
        userId
    }

})

const createChatDb = async(firstId, secondId)=> await prisma.chat.create({
    data:{
        firstId,
        secondId
    }
})
export {registerDb, ticketsDb, createChatDb}