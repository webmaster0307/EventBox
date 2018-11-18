import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'operator', 'user'],
    default: 'user'
  },
  events: {
    type: Schema.Types.ObjectId,
    ref: 'event'
  }
}, {
  timestamps: true
});

// pre-hook

UserSchema.pre('save', async function(next){
  this.password = await this.generatePasswordHash()
  return next()
})

// method
UserSchema.methods.generatePasswordHash = async function(){
  const saltRounds = 10;
  return await bcrypt.hash(this.password, saltRounds);
}

UserSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

// statics

UserSchema.statics.findByLogin = async function(username){
  let user = await this.findOne({username})
  if (!user) {
    user = await this.findOne({email: username})
  }

  return user;
};

export default mongoose.model('user', UserSchema);