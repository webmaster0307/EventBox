import mongoose from 'mongoose'

const Schema = mongoose.Schema

let departmentSchema = new Schema({
  name: {
    type: String,
    required: true
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

export default mongoose.model('department', departmentSchema)
