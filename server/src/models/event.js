import mongoose from 'mongoose'
import slugify from '@sindresorhus/slugify'

const Schema = mongoose.Schema

let eventSchema = new Schema(
  {
    title: {
      type: String
    },
    slug: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    rawHtmlContent: {
      type: String,
      default: ''
    },
    shortDescription: {
      type: String,
      default: ''
    },
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'department'
      }
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    categories: {
      type: Array,
      default: []
    },
    images: {
      type: Object
    },
    location: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    registerStartAt: {
      type: Date,
      default: ''
    },
    registerEndAt: {
      type: Date,
      default: ''
    },
    maxTickets: {
      type: Number,
      default: 20
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    organizationName: {
      type: String,
      default: ''
    },
    organizationLogo: {
      type: String,
      default: ''
    },
    organizationDescription: {
      type: String,
      default: ''
    },
    startTime: {
      type: Date,
      default: ''
    },
    endTime: {
      type: Date,
      default: ''
    },
    status: {
      type: String,
      enum: ['draft', 'in-review', 'rejected', 'active'],
      default: 'draft'
    },
    participants: {
      type: Array
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
)

eventSchema.pre('save', function(next) {
  this.slug = slugify(this.title)
  next()
})

eventSchema.pre('find', async (next) => {
  next()
})

export default mongoose.model('event', eventSchema)
