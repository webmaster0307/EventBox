import { Schema, model } from 'mongoose'

let draftEventSchema = new Schema({
  name: {
    type: String
  },
  categoryId: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  createAt: {
    type: Number
  },
  registerTimeFrom: {
    type: Number
  },
  registerTimeTo: {
    type: Number
  },
  ownerID: {
    type: String
  },
  approvedBy: {
    type: String
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default model('DraftEvent', draftEventSchema)
