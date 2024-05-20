import express from "express";
import { createTickets } from "../Controllers/tickets.js";
import { searchTickets } from "../Controllers/tickets.js";

const router = express.Router()

router.post("/postTicket", createTickets)
router.post('/findTickets', searchTickets)

export default router