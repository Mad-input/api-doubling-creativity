import mongoose, { Schema } from 'mongoose'

const detailSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutorialTitle: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  maxPoints: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})
export const DetailModel = mongoose.model('details', detailSchema)
