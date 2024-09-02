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

const whiteList = ['http://localhost:4321', 'https://doubingcreativity.netlify.app']
const optionsCors = {
  origin: whiteList,
  credentials: true, // Permitir credenciales (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(json())
app.use(cookieParser())
app.options('*', cors(optionsCors)) // Maneja las solicitudes preflight
app.use(cors(optionsCors))
app.use(authRouter)
app.use(detailsRoutes)

app.get('/protected', validateToken)

app.listen(PORT, () => {
  console.log('Sever on port ', PORT)
})
