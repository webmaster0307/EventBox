import mongoose from 'mongoose'
import slugify from '@sindresorhus/slugify'

const Schema = mongoose.Schema

let draftEventSchema = new Schema({
  thumbnail: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String,
    default: ''
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  shortDesc: {
    type: String,
    default: ''
  },
  description: {
    type: String
  },
  orgName: {
    type: String
  },
  orgDesc: {
    type: String
  },
  ctTelePhone: {
    type: Number
  },
  ctEmail: {
    type: String
  },
  eventTime: {
    type: Array
  },
  regTime: {
    type: Array
  },
  amountOfTicket:{
    type: Number,
    min: 0
  },
  slug: {
    type: String,
    default: ''
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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
