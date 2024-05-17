import express from "express"
import { user } from "../Controllers/register.js";
const router = express.Router()
router.post('/register', user)

export default router