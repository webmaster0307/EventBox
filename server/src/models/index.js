import mongoose from 'mongoose'

import User from './user'
import Category from './category'
import Contact from './contact'
import Department from './department'
import Draftevent from './draftEvent'
import Event from './event'

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 30000
  }
  )
    .then(() => {
      console.log(`Connect to MongoDB successful! (${process.env.MONGODB_URI})`)
    })
    .catch(err => console.error(`Could not connect to MongoDB at ${process.env.MONGODB_URI}`, err))
} else {
  throw new Error(`MONGODB_URI env doesn't exist`)
}

export default {
  Category,
  Contact,
  Department,
  Draftevent,
  Event,
  User
}
