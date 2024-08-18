import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import detailsRoutes from './routes/details.routes.js'
import { validateToken } from './middlewares/validateToken.middleware.js'
import { URI } from './config.db.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000

mongoose.connect(URI)

const app = express()

app.use(json())
app.use(cookieParser())
app.options('*', cors()) // Maneja las solicitudes preflight
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(authRouter)
app.use(detailsRoutes)

app.get('/protected', validateToken)

app.listen(PORT, () => {
  console.log('Sever on port ', PORT)
})
