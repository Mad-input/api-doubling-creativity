import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.middleware.js'
import {
  getAllDetails,
  createDetailUser,
  getDetailUser
} from '../controllers/details.controllers.js'

const router = Router()

router.get('/details', validateToken, getAllDetails)
router.post('/details', validateToken, createDetailUser)
router.get('/details/:title', validateToken, getDetailUser)

export default router
