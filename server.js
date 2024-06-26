import express from "express"
import cors from "cors"
import morgan from "morgan"
import userRouter from './Src/Routes/useRoutes.js'
import ticketsRouter from './Src/Routes/ticketsRoute.js'
import chatRouter from './Src/Routes/chatRoutes.js'
import messageRouter from './Src/Routes/messageRoutes.js'
const app = express()
app.disable('x-powered-by');


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter)
app.use("/", ticketsRouter)
app.use("/api/chat", chatRouter)
app.use("/api/message", messageRouter)


export {app}