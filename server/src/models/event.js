import mongoose from 'mongoose'
import slugify from '@sindresorhus/slugify'

const Schema = mongoose.Schema

let EventSchema = new Schema({
  title: {
    type: String
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
  images: {
    type: Object
  }
}, {
  timestamps: true
})

EventSchema.pre('save', function (next) {
  this.slug = slugify(this.title)
  next()
})

EventSchema.pre('find', async (next) => {
  next()
})

export default mongoose.model('event', EventSchema)
