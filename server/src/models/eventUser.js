import mongoose from 'mongoose'

const Schema = mongoose.Schema

let eventUserSchema = new Schema(
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
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('eventuser', eventUserSchema)
