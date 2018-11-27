import { Schema, model } from 'mongoose'

let DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default model('Department', DepartmentSchema)
