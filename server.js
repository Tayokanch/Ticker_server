import express from "express"
import cors from "cors"
import morgan from "morgan"
import userRouter from './Src/Routes/useRoutes.js'
const app = express()
app.disable('x-powered-by');


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)

export {app}