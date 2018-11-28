import { Schema, model } from 'mongoose'
import slugify from '@sindresorhus/slugify'

let eventSchema = new Schema({
  title: {
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
  slug: {
    type: String,
    default: ''
  },
  images: {
    type: Object
  },
  location: {
    type: String,
    required: true
  },
  registerTimeFrom: {
    type: Date,
    required: true
  },
  registerTimeTo: {
    type: Date,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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

eventSchema.pre('save', function (next) {
  this.slug = slugify(this.title)
  next()
})

eventSchema.pre('find', async (next) => {
  next()
})

export default model('event', eventSchema)
