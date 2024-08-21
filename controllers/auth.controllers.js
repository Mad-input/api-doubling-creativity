import { registerUser, loginUser, foundUser } from '../db/db.js'
import { createAccessToken } from '../libs/jwt.js'

export const controllerRegister = async (req, res) => {
  try {
    const user = await registerUser(req.body)
    req.user = user
    if (user) return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const controllerLogin = async (req, res) => {
  try {
    const user = await loginUser(req.body)
    const id = user.id
    const token = await createAccessToken({ id })
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      })
      .status(200)
      .json({ user })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const controllerLogout = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  })
  res.json({ message: 'logout' })
}

export const controllerProfile = async (req, res) => {
  try {
    const id = req.userId
    const user = await foundUser(id)
    res.status(200).json({ user })
  } catch (error) {
    throw new Error(error)
  }
}
