import mongoose from 'mongoose';
import slugify from '@sindresorhus/slugify'

const Schema = mongoose.Schema;

let EventSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  slug: {
    type: String,
    default: ''
  }
}, {
    timestamps: true
})

EventSchema.pre('save', function(next){
  this.slug = slugify(this.title)
  next()
})

EventSchema.pre('find', async (next) => {
  next()
})

export default mongoose.model('event', EventSchema);