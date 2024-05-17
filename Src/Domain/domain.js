import prisma from "../utils";

const registerDb = async(firstname, lastname, email, password)=> await prisma.register.create({
    data:{
        firstname,
        lastname,
        email,
        password
    }
})

export {registerDb}