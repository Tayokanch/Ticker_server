import {prisma} from '../utils.js'
const registerDb = async(firstname, lastname, email, password, userQuestion, userAnswer, result)=> await prisma.user.create({
    data:{
        firstname,
        lastname,
        email,
        password,
        userQuestion,
        userAnswer,
        image: {
            publicId: result.public_id,
            url: result.secure_url
        } 

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
    data: {
        members: [firstId, secondId]
    }
})

const createMessageDb = async (chatId, senderId, text)=> await prisma.messages.create({
    data:{
        chatId,
        senderId,
        text
    }
})
export {registerDb, ticketsDb, createChatDb, createMessageDb}