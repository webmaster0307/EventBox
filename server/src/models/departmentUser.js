import mongoose from 'mongoose'

const Schema = mongoose.Schema

let departmentUserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'department'
  },
  departmentRole: {
    type: String,
    enum: ['member', 'reviewer', 'head'],
    default: 'reviewer'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('departmentuser', departmentUserSchema)