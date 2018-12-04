import { Schema, model } from 'mongoose'

let contactSchema = new Schema({
  eula: {
    type: String
  },
  description: {
    type: String
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: Array
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

export default model('contact', contactSchema)
