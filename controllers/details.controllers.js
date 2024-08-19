import {
  getDetails,
  createDetail,
  deleteDetail,
  updateDetail
} from '../db/db.js'

const getAllDetails = async (req, res) => {
  try {
    const details = await getDetails(req.userId)
    res.status(200).json({ details })
  } catch (error) {
    throw new Error(error)
  }
}

const createDetailsUser = async (req, res) => {
  try {
    const detail = await createDetail(req.body)
    res.status(200).json({ detail })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteDetailsUser = async (req, res) => {
  try {
    await deleteDetail(req.body)
    res.status(201)
  } catch (error) {
    throw new Error(error.message)
  }
}
const updateDetailsUser = async (req, res) => {
  try {
    const detail = await updateDetail(req.params.id, req.body)
    res.status(200).json({ detail })
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  getAllDetails,
  createDetailsUser,
  deleteDetailsUser,
  updateDetailsUser
}
