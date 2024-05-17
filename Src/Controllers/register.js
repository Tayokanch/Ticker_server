import { registerDb } from "../Domain/domain.js";

const user = async(req, res)=>{
    const{firstname, lastname, email, password} = req.body
    console.log('req.body',req.body)

    if(!firstname, !lastname, !email, !password){
        return res.status(400).json('Missing field in the request body')
    }
    const newUser = await registerDb(firstname, lastname, email, password)
    try{
        res.status(201).json("You've Succesfully registered")
    }catch(err){
        res.status(500).json(err.message)
    }
}


export {user}