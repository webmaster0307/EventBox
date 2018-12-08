import mongoose from 'mongoose'
import slugify from '@sindresorhus/slugify'

const Schema = mongoose.Schema

let draftEventSchema = new Schema({
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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  images: {
    type: Array
  },
  location: {
    type: String,
    default: ''
  },
  regFrom: {
    type: Date,
    default: ''
  },
  regTo: {
    type: Date,
    default: ''
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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

export default mongoose.model('draftEvent', draftEventSchema)
