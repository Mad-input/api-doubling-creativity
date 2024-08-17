import { Router } from 'express'
import {
  controllerRegister,
  controllerLogin,
  controllerLogout,
  controllerProfile
} from '../controllers/auth.controllers.js'
import { validateToken } from '../middlewares/validateToken.middleware.js'

const router = Router()

router.post('/register', controllerRegister)

router.post('/login', controllerLogin)

router.post('/logout', controllerLogout)

router.get('/profile', validateToken, controllerProfile)

export default router
