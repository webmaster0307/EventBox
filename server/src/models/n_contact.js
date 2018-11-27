import { Schema, model } from 'mongoose'

let ContactSchema = new Schema({
  eula: {
    type: String
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Array,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default model('Contact', ContactSchema)
