import { createChat, findUserChats, findParticularChat } from "../Controllers/chat.js";
import express from "express"

const router = express.Router()

router.post('/',createChat)
router.get('/:userId',findUserChats)
router.get('/find/:firstId/:secondId', findParticularChat);

export default router