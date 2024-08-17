import { registerUser, loginUser, foundUser } from '../db/db.js'
import { createAccessToken } from '../libs/jwt.js'

export const controllerRegister = async (req, res) => {
  try {
    const user = await registerUser(req.body)
    req.user = user
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).send(error)
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .status(200)
      .json({ user })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const controllerLogout = (req, res) => {
  res.clearCookie('access_token')
  res.json({ message: 'logout' })
}

export const controllerProfile = async (req, res) => {
  try {
    const id = req.userId
    const user = await foundUser(id)
    res.status(200).json({ user })
  } catch (error) {
    throw new Error(error.message)
  }
}
