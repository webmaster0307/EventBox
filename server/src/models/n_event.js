import { Schema, model } from 'mongoose'
import moment from 'moment'

let EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createAt: {
    type: Number,
    required: true,
    default: moment().unix()
  },
  registerTimeFrom: {
    type: Number
  },
  registerTimeTo: {
    type: Number
  },
  ownerID: {
    type: String,
    required: true
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

export default model('Event', EventSchema)
