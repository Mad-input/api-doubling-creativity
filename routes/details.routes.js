import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.middleware.js'
import {
  getAllDetails,
  createDetailUser
} from '../controllers/details.controllers.js'

const router = Router()

router.get('/details', validateToken, getAllDetails)
router.post('/details', validateToken, createDetailUser)

export default router
