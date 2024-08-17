import { UserModel } from '../model/user.model.js'
import { DetailModel } from '../model/details.model.js'
import bcrypt from 'bcrypt'

const registerUser = async ({ name, email, password, isAdmin }) => {
  try {
    const userFound = await UserModel.findOne({ email })
    if (userFound) throw new Error('Already user exists')

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ name, email, password: hashedPassword, isAdmin })
    const userCreated = await newUser.save()
    return { name: userCreated.name, email: userCreated.email }
  } catch (e) {
    throw new Error(`${e}`)
  }
}

const loginUser = async ({ email, password }) => {
  try {
    const userFound = await UserModel.findOne({ email })
    if (!userFound) throw new Error('user does not exist')

    const macth = await bcrypt.compare(password, userFound.password)
    if (!macth) throw new Error('user or password invalid')

    return {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createAt: userFound.createdAt
    }
  } catch (e) {
    throw new Error(`${e}`)
  }
}

const foundUser = async (id) => {
  const userFound = await UserModel.findById({ _id: id })
  if (!userFound) throw new Error('User not found')

  return {
    name: userFound.name,
    email: userFound.email,
    createAt: userFound.createdAt,
    isAdmin: userFound.isAdmin
  }
}

const getDetails = async (id) => {
  const details = await DetailModel.find({ user: id }).populate('user')
  if (!details) throw new Error('Not found')

  return details
}

const createDetail = async ({ user, title, completed }) => {
  try {
    const foundDetail = await DetailModel.findOne({ title })
    if (foundDetail) return

    const newDetail = await new DetailModel({ user, title, completed })
    const detailCreated = await newDetail.save()
    return detailCreated
  } catch (error) {
    throw new Error(error)
  }
}

const updateDetail = async (id, data) => {
  try {
    const foundDetail = await DetailModel.findByIdAndUpdate({ _id: id }, { data }, { new: true })
    return foundDetail
  } catch (error) {
    throw new Error(error)
  }
}

const deleteDetail = async (id) => {
  try {
    await DetailModel.findByIdAndDelete({ id })
  } catch (error) {
    throw new Error(error)
  }
}

export {
  registerUser,
  loginUser,
  foundUser,
  getDetails,
  createDetail,
  updateDetail,
  deleteDetail
}
