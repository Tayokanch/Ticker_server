import express from "express"
import { CreateUser } from "../Controllers/register.js";
import {login} from "../Controllers/register.js";
import { updatePassword } from "../Controllers/register.js";
import { findUser } from "../Controllers/register.js";
import { getUsers } from "../Controllers/register.js";
import { findUserById } from "../Controllers/register.js";
import uploadImage from "../Controllers/images.js";
const router = express.Router()
router.post('/register', uploadImage.single('file'), CreateUser);
router.post('/login', login)
router.post('/findUser', findUser)
router.post('/updatepassword', updatePassword)
router.get('/find/:userId', findUserById)
router.get("/", getUsers)





export default router