import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  userImage: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const UserModel = model('user', userSchema, 'users')

export {
  UserModel
}
