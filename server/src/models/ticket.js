import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ticketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    eventId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'event'
    },
    code: {
      type: String,
      default: ''
    },
    ticketSvgSrc: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      default: ''
    },
    studentId: {
      type: String,
      default: ''
    },
    checkedIn: {
      type: Boolean,
      default: false
    },
    checkedInTime: {
      type: Date,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('ticket', ticketSchema)
