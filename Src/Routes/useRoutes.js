import express from "express"
import { CreateUser } from "../Controllers/register.js";
import {login} from "../Controllers/register.js";
import { updatePassword } from "../Controllers/register.js";

const router = express.Router()
router.post('/register', CreateUser)
router.post('/login', login)
router.post('/updatepassword', updatePassword)


export default router