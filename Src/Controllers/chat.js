import { createChatDb } from '../Domain/domain.js';
import {prisma} from '../utils.js'
createChatDb

const createChat = async(req, res)=>{

    const{firstId, secondId}= req.body
    try{

        const checkIfChatExists = await prisma.chat.findUnique({
            where: {
                AND: [
                    { members: { has: firstId } },
                    { members: { has: secondId } }
                ]
            }
        });
        if(checkIfChatExists){
            return res.status(200).json({chat:checkIfChatExists})
        }

        const newChat = await prisma.chat.create({
            data:{
                firstId,
                secondId
            }
        })
        return res.status(200).json({chat:newChat})
        
    }catch(err){
        console.error(err)
       return res.status(500).json({error:"Internal Server error"})
    }

}

const findUserChat = async()=>{
    const {userId} = req.params
    try{
        const userChat = await prisma.chat.findUnique({
            where: {
                members: { has: userId }
            }
        });

        if(!userChat){
            return res.status(400).json("Chat not found for user")
        }

        return res.status(200).json({chat:userChat})
    }catch(err){
        console.error(err)
       return res.status(500).json({error:"Internal Server error"})
    }


}

const findParticularChat = async()=>{
    const {firstId, secondId} = req.params
    try{
       const chat =  await prisma.chat.findUnique({
            where: {
                AND: [
                    { member: { has: firstId } },
                    { member: { has: secondId } }
                ]
            }
        });

        if(!chat){
            return res.status(400).json("Chat not found ")
        }

        return res.status(200).json({chat})
    }catch(err){
        console.error(err)
       return res.status(500).json({error:"Internal Server error"})
    }


}

export {findUserChat, createChat, findParticularChat}