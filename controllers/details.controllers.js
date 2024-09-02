import {
  getDetails,
  createDetail,
  getDetail
} from '../db/db.js'

const getAllDetails = async (req, res) => {
  try {
    const details = await getDetails(req.userId)
    res.status(200).json({ details })
  } catch (error) {
    throw new Error(error)
  }
}

const createDetailUser = async (req, res) => {
  try {
    const { user, tutorialTitle, points, maxPoints } = req.body

    // Valida que se hayan recibido todos los datos necesarios
    if (!tutorialTitle || points === undefined || maxPoints === undefined) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    await createDetail({ userId: user, tutorialTitle, points, maxPoints })

    res.status(201).json({ message: 'Resultado del quiz guardado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error guardando el resultado del quiz' })
  }
}

const getDetailUser = async (req, res) => {
  const { userId } = req.body
  try {
    const detail = await getDetail(req.params.title, userId)
    res.status(200).json({ detail })
  } catch (error) {
    throw new Error(error)
  }
}

export {
  getAllDetails,
  createDetailUser,
  getDetailUser
}
