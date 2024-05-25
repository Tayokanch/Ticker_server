import { createChatDb } from '../Domain/domain.js';
import {prisma} from '../utils.js'


const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {

        const checkIfChatExists = await prisma.chat.findFirst({
            where: {
                AND: [
                    { members: { has: firstId } },
                    { members: { has: secondId } }
                ]
            }
        });
        if (checkIfChatExists) {
            return res.status(200).json({ chat: checkIfChatExists });
        }

        const newChat = await createChatDb(firstId, secondId);
        return res.status(200).json({ chat: newChat });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server error" });
    }
};


const findUserChats = async(req, res)=>{
    const {userId} = req.params
    try{
        const userChat = await prisma.chat.findMany({
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

const findParticularChat = async(req, res)=>{
    try{
       const chat =  await prisma.chat.findFirst({
            where: {
                AND: [
                    { members: { has: firstId } },
                    { members: { has: secondId } }
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

export {findUserChats, createChat, findParticularChat}