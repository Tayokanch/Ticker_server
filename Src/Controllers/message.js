import { createMessageDb } from "../Domain/domain.js"
import {prisma} from '../utils.js'

const createMessage = async (req, res)=>{
    const {text, chatId, senderId} = req.body

    try{
      const createNewMessage = await createMessageDb(chatId, senderId, text)
      return res.status(200).json({message: createNewMessage})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({error: "internal Server Error"})
    }
}


const getMessages = async (req, res)=>{
    const {chatId}= req.params

    try{
        const messages = await prisma.messages.findMany({
            where:{
                chatId:chatId
            }
        })
        return res.status(200).json({messages})


    }
    catch(err){
        console.error(err)
        return res.status(500).json({error: "internal Server Error"})
    }
}

export{createMessage, getMessages}