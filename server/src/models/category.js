import mongoose from 'mongoose'

const Schema = mongoose.Schema

let categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('category', categorySchema)
