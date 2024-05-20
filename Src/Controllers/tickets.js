import {prisma} from '../utils.js'
import { ticketsDb } from '../Domain/domain.js'

const createTickets = async (req, res)=>{
    const {ticketLocation,ticketDestination,price, description, userId} = req.body;
    try{
        if(!ticketDestination || !ticketLocation || !price || !description || !userId){
            res.status(400).json({error: "Missing field in the request body"})
        }
        const createNewTicket = await ticketsDb(ticketLocation, ticketDestination, price, description, userId)
        return res.status(201).json({message: "You've successfully posted your ticket"})

    }catch(error){
        console.error("this is the error", error)
        return  res.status(500).json({error: "Internal server error"})
    }
    

}

const searchTickets = async (req, res)=>{
    const {ticketLocation, ticketDestination}= req.body
    try{
        if(!ticketLocation || !ticketDestination){
            res.status(400).json({error: "Missing field in the request body"})
        }

        const tickets = await prisma.tickets.findMany({
            where: {
                ticketLocation,
                ticketDestination
            },
            select:{
                id : true,
                ticketLocation: true,
                ticketDestination: true,
                price: true,
                description: true
            }
        })
        return res.status(200).json({tickets})

    }catch(error){
        console.error("this is the error", error)
        return res.status(500).json({error: "Internal server error"})
    }
}

export {createTickets, searchTickets}