import { registerDb } from "../Domain/domain.js";
import bcrypt from "bcrypt"
import { prisma } from "../utils.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { cloudinary } from "../utils.js";

dotenv.config();

const SECRET = process.env.SECRET


const CreateUser = async (req, res) => {

    const { firstname, lastname, email, password, userQuestion, userAnswer , image} = req.body;

  
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "userImages"
        })

      if (!firstname || !lastname || !email || !password || !userQuestion || !userAnswer) {
        return res.status(400).json({ error: 'Missing field in the request body' })
      }
      if (!image) {
        return res.status(400).json({ error: 'File is required' });
      }
  
      const compareUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
  
      if (compareUser) {
        return res.status(400).json({ error: 'User with provided email already exists' });
        }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await registerDb(firstname, lastname, email, hashedPassword, userQuestion, userAnswer, result);
      return res.status(201).json({ message: "You've Successfully registered" });

    } 
    catch (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    } 
};
  

const login = async (req, res) =>{
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
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
        return res.status(200).json({token, login: true, id : user.id, firstname : user.firstname, lastname : user.lastname, email :user.email , image: user.image})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({ error: 'Internal server error' });
    }


}

const findUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json('Missing field in the request body');
    }

    try {
        const user = await prisma.user.findUnique({
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

const findUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId 
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" }); 
        }

        res.status(200).json({id: user.id,firstname : user.firstname}); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" }); 
    }
};


const getUsers = async (req, res)=>{
    try{
        const users = await prisma.user.findMany()
        res.status(200).json({users})

    }catch(err){
        console.error(err)
        return res.status(500).json({error:"Internal Server error"})

    }

}


const updatePassword = async(req, res)=>{
    const { email,newPassword, userAnswer} = req.body
        
    if ( !email|| !newPassword ||!userAnswer ) {
            return res.status(400).json({error:'Missing field in the request body'});
    }

    try{
        const user = await prisma.user.findUnique({
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
        const changedPassword = await prisma.user.update({
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




export { CreateUser, login, updatePassword, findUser, getUsers, findUserById};
