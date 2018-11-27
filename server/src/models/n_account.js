import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

let UserSchema = new Schema({
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
    default: 'User'
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  }
})

// pre-hook
UserSchema.pre('save', async function (next) {
  this.password = await this.generatePasswordHash()
  return next()
})

// method
UserSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10
  const data = await bcrypt.hash(this.password, saltRounds)
  return data
}

UserSchema.methods.validatePassword = async function (password) {
  const data = await bcrypt.compare(password, this.password)
  return data
}

// statics
UserSchema.statics.findByLogin = async function (username) {
  let user = await this.findOne({ username })
  if (!user) {
    user = await this.findOne({ email: username })
  }
  return user
}

export default model('User', UserSchema)
