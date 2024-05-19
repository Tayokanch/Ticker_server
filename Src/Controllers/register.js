import { registerDb } from "../Domain/domain.js";
import bcrypt from "bcrypt"
import { prisma } from "../utils.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET

const CreateUser = async (req, res) => {

    const { firstname, lastname, email, password, userQuestion,userAnswer } = req.body;
    try {

        if (!firstname || !lastname || !email || !password || !userQuestion|| !userAnswer)  {
            return res.status(400).json({error :'Missing field in the request body'});
        }
        const compareUser = await prisma.register.findUnique({
            where:{
                email: email
            }
        })
    
        if(compareUser){
            return res.status(400).json({error: 'User with provided email already exists'})
        }

        const hashedpassword = await bcrypt.hash(password, 12)
        const newUser = await registerDb(firstname, lastname, email, hashedpassword, userQuestion, userAnswer);
        return res.status(201).json({message : "You've Successfully registered"});
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const login = async (req, res) =>{
    const {email, password} = req.body
    const user = await prisma.register.findUnique({
        where:{
            email: email
        }
    })
    try{
        if(!user){
            return res.status(404).json({ error: "Incorrect email or password" });
        }
        const userPassword = await bcrypt.compare(password, user.password)
        if(!userPassword){
            return res.status(404).json({ error: "Incorrect email or password" });
        }
        const token = await jwt.sign({id:user.id, firstname:user.firstname}, SECRET)
        return res.status(200).json({token, login: true })
    

    }
    catch(err){
        return res.status(500).json({ error: 'Internal server error' });
    }


}

const findUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json('Missing field in the request body');
    }

    try {
        const user = await prisma.register.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User with the email not found" });
        }
        return res.status(200).json({ question: user.userQuestion, email: user.email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const updatePassword = async(req, res)=>{
    const { email,newPassword, userAnswer} = req.body
        
    if ( !email|| !newPassword ||!userAnswer ) {
            return res.status(400).json({error:'Missing field in the request body'});
    }

    try{
        const user = await prisma.register.findUnique({
            where:{
                email: email
            }
        })
        if(!user){
            return res.status(404).json({error: "user with the email not found"})
        }
    
        const verifySecurityAnswer = user.userAnswer.toLowerCase() === userAnswer.toLowerCase();
        if(!verifySecurityAnswer){
            return res.status(404).json({error: "incorrect answer"})
        }

        const hashedpassword = await bcrypt.hash(newPassword, 12)
        const changedPassword = await prisma.register.update({
            where:{
                email:email
            },
            data:{
                password: hashedpassword
            }
        })
        if(!changedPassword){
            return res.status(400).json({error: "error trying to change password"})
        }
        return res.status(200).json({ message: "Password successfully updated" });
    }
    catch(err){
        console.error(err)
      return res.status(500).json({error: "inter server error"})
    }


}




export { CreateUser, login, updatePassword, findUser};
