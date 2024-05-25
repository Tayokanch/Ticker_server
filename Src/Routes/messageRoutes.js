import express from "express"
import { getMessages } from "../Controllers/message.js"
import { createMessage } from "../Controllers/message.js"

const router = express.Router()

router.post('/', createMessage)
router.get('/:chatId', getMessages)

export default router