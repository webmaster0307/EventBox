import { Schema, model } from 'mongoose'

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

export default model('department', departmentSchema)
