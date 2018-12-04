import { Schema, model } from 'mongoose'
import slugify from '@sindresorhus/slugify'

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
  slug: {
    type: String,
    default: ''
  },
  images: {
    type: Object
  },
  location: {
    type: String
  },
  registerTimeFrom: {
    type: Date
  },
  registerTimeTo: {
    type: Date
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
}, {
  timestamps: true
})

draftEventSchema.pre('save', function (next) {
  this.slug = slugify(this.title)
  next()
})

draftEventSchema.pre('find', async (next) => {
  next()
})

export default model('draftEvent', draftEventSchema)
