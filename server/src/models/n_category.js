import { Schema, model } from 'mongoose'

let CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default model('Category', CategorySchema)
