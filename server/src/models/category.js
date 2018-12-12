import mongoose from 'mongoose'

const Schema = mongoose.Schema

let categorySchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
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
