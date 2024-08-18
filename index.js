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
// app.use(cors({
//   origin: 'http://localhost:4321',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://your-frontend.com'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Private-Network', true)
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader('Access-Control-Max-Age', 7200)

  next()
})
app.use(authRouter)
app.use(detailsRoutes)

app.get('/protected', validateToken)

app.listen(PORT, () => {
  console.log('Sever on port ', PORT)
})
