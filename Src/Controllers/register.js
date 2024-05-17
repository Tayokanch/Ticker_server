import { registerDb } from "../Domain/domain";

const user = async(req, res)=>{
    const{firstname, lastname, email, password} = req.body

    if(!firstname, !lastname, !email, !password){
        return res.status(400).json('Missing field in the request body')
    }
    const newUser = await registerDb(firstname, lastname, email, password)
    try{
        res.status(201).json("You've Succesfully registered")
    }catch(err){
        res.status(500).json(e.message)
    }
}


export {user}