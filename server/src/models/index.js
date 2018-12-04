import mongoose from 'mongoose'

import user from './user'
import category from './category'
import contact from './contact'
import department from './department'
import draftEvent from './draftEvent'
import event from './event'

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
  user,
  category,
  contact,
  department,
  draftEvent,
  event
}
