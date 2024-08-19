import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import detailsRoutes from './routes/details.routes.js'
import { validateToken } from './middlewares/validateToken.middleware.js'
import { URI } from './config.db.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000
const app = express()
mongoose.connect(URI)

const whiteList = ['http://localhost:4321']
const optionsCors = {
  origin: whiteList,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(json())
app.use(cookieParser())
app.use(cors(optionsCors))
app.options('*', cors(optionsCors)) // Maneja las solicitudes preflight
app.use(authRouter)
app.use(detailsRoutes)

app.get('/protected', validateToken)

app.listen(PORT, () => {
  console.log('Sever on port ', PORT)
})
