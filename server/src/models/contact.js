import mongoose from 'mongoose'

const Schema = mongoose.Schema

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

export default mongoose.model('contact', contactSchema)
