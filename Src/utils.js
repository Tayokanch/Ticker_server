import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_KEY_SECRET 
});

const prisma = new PrismaClient()

export {prisma, cloudinary}

