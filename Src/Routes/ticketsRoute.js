import express from "express";
import { createTickets } from "../Controllers/tickets.js";
import { searchTickets } from "../Controllers/tickets.js";
import { getAllTickets } from "../Controllers/tickets.js";

const router = express.Router()

router.post("/postTicket", createTickets)
router.post('/findTickets', searchTickets)
router.get("/allTickets", getAllTickets)


export default router