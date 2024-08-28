import { UserModel } from '../model/user.model.js'
import { DetailModel } from '../model/details.model.js'
import bcrypt from 'bcrypt'

const registerUser = async ({ name, email, password, isAdmin, userImage }) => {
  try {
    const userFound = await UserModel.findOne({ email })
    if (userFound) throw new Error('Already user exists').message

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ name, email, password: hashedPassword, isAdmin, userImage })
    const userCreated = await newUser.save()
    return { name: userCreated.name, email: userCreated.email }
  } catch (e) {
    throw new Error(e).message
  }
}

const loginUser = async ({ email, password }) => {
  try {
    const userFound = await UserModel.findOne({ email })
    if (!userFound) throw new Error('user does not exist').message

    const macth = await bcrypt.compare(password, userFound.password)
    if (!macth) throw new Error('user or password invalid')

    return {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createAt: userFound.createdAt,
      userImage: userFound.userImage
    }
  } catch (e) {
    throw new Error(`${e}`).message
  }
}

const foundUser = async (id) => {
  const userFound = await UserModel.findById({ _id: id })
  if (!userFound) throw new Error('User not found')

  return {
    name: userFound.name,
    email: userFound.email,
    createAt: userFound.createdAt,
    isAdmin: userFound.isAdmin,
    imageUser: userFound.userImage
  }
}

const getDetails = async (id) => {
  const details = await DetailModel.find({ user: id }).populate('user')
  if (!details) throw new Error('Not found')

  return details
}

const createDetail = async ({ userId, tutorialTitle, points, maxPoints }) => {
  try {
    const foundDetail = await DetailModel.findOne({ tutorialTitle })
    if (foundDetail) return
    // Crea un nuevo resultado de quiz
    const quizResult = new DetailModel({
      userId, // Obtén el ID del usuario desde el middleware de autenticación
      tutorialTitle,
      points,
      maxPoints
    })
    // Guarda el resultado en la base de datos
    await quizResult.save()
  } catch (error) {
    throw new Error(error)
  }
}

export {
  registerUser,
  loginUser,
  foundUser,
  getDetails,
  createDetail
}
