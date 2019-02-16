import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const Schema = mongoose.Schema

let userSchema = new Schema(
  {
    email: {
      type: String
    },
    username: {
      type: String,
      unique: true,
      lowercase: true
    },
    password: {
      type: String
    },
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'department'
    },
    phoneNumber: {
      type: Number
    },
    secret: {
      type: String
    },
    role: {
      type: Array,
      default: ['user']
    },
    events: {
      type: Schema.Types.ObjectId,
      ref: 'event'
    },
    isActivated: {
      type: Boolean,
      required: true,
      default: false
    },
    activateToken: {
      type: String
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

// pre-hook
userSchema.pre('save', async function(next) {
  if (process.env.NODE_ENV === 'test') {
    return next()
  }
  this.password = await this.generatePasswordHash()
  return next()
})

// method
userSchema.methods.generatePasswordHash = async function() {
  const saltRounds = 10
  const data = await hash(this.password, saltRounds)
  return data
}

userSchema.methods.validatePassword = async function(password) {
  const data = await compare(password, this.password)
  return data
}

// statics
userSchema.statics.findByLogin = async function(username) {
  const user = await this.findOne({ $or: [{ username }, { email: username }] })
  return user
}

export default mongoose.model('user', userSchema)
