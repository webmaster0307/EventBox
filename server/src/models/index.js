import mongoose from 'mongoose'
// import User from './user'
// import Event from './event'

import Account from './n_account'
import Category from './n_category'
import Contact from './n_contact'
import Department from './n_department'
import DraftEvent from './n_draftEvent'
import Event from './n_event'

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
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
  Account,
  Category,
  Contact,
  Department,
  DraftEvent,
  Event
}
