import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import { URI, PORT } from './config.db.js'
import mongoose from 'mongoose'

mongoose.connect(URI)

const app = express()

app.use(json())
app.use(cookieParser())
app.use(cors({
  origin: '*',
  credentials: true
}))

app.use(authRouter)

app.listen(PORT, () => {
  console.log('Sever on port ', PORT)
})
