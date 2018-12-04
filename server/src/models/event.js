import { Schema, model } from 'mongoose'
import slugify from '@sindresorhus/slugify'

let eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    default: ''
  },
  description: {
    type: String
  },
  shortDescription: {
    type: String,
    default: ''
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  categoryId: {
    type: String,
    required: true
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
  approvedBy: {
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

eventSchema.pre('save', function (next) {
  this.slug = slugify(this.title)
  next()
})

eventSchema.pre('find', async (next) => {
  next()
})

export default model('event', eventSchema)
