import {
  getDetails,
  createDetail
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
    const { tutorialTitle, points, maxPoints } = req.body
    const { userId } = req

    // Valida que se hayan recibido todos los datos necesarios
    if (!tutorialTitle || points === undefined || maxPoints === undefined) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    await createDetail({ userId, tutorialTitle, points, maxPoints })

    res.status(201).json({ message: 'Resultado del quiz guardado exitosamente' })
  } catch (error) {
    console.error('Error guardando el resultado del quiz:', error)
    res.status(500).json({ message: 'Error guardando el resultado del quiz' })
  }
}

export {
  getAllDetails,
  createDetailUser
}
