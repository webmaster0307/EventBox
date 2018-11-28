import { Schema, model } from 'mongoose'
import { hash, compare } from 'bcryptjs'

let userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  secret: {
    type: String
  },
  role: {
    type: Array,
    default: 'user'
  },
  events: {
    type: Schema.Types.ObjectId,
    ref: 'event'
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

// pre-hook
userSchema.pre('save', async function (next) {
  this.password = await this.generatePasswordHash()
  return next()
})

// method
userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10
  const data = await hash(this.password, saltRounds)
  return data
}

userSchema.methods.validatePassword = async function (password) {
  const data = await compare(password, this.password)
  return data
}

// statics
userSchema.statics.findByLogin = async function (username) {
  let user = await this.findOne({ username })
  if (!user) {
    user = await this.findOne({ email: username })
  }
  return user
}

export default model('user', userSchema)
