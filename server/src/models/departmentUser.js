import mongoose from 'mongoose'

const Schema = mongoose.Schema

let departmentUserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'department'
    },
    departmentRole: {
      type: String,
      enum: ['member', 'reviewer', 'head'],
      default: 'reviewer'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('departmentuser', departmentUserSchema)
