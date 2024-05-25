import { createChat, findUserChat, findParticularChat } from "../Controllers/chat.js";
import express from "express"

const router = express.Router()

router.post('/',createChat)
router.get('/:userId',findUserChat)
router.get('/find/:firstId:secondId',findParticularChat)

export default router