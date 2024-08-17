import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.db.js'

export const validateToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) return res.status(403).json({ message: 'Inavlid token' })
    req.userId = data.id
    next()
  })
}
