import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.middleware.js'
import {
  getAllDetails,
  createDetailsUser,
  deleteDetailsUser,
  updateDetailsUser
} from '../controllers/details.controllers.js'

const router = Router()

router.get('/details', validateToken, getAllDetails)
router.post('/details', validateToken, createDetailsUser)
router.put('/details/:id', validateToken, updateDetailsUser)
router.delete('/details/:id', validateToken, deleteDetailsUser)

export default router
