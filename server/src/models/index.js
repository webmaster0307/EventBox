import mongoose from 'mongoose'

import account from './n_account'
import category from './n_category'
import contact from './n_contact'
import department from './n_department'
import draftEvent from './n_draftEvent'
import event from './n_event'

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
  account,
  category,
  contact,
  department,
  draftEvent,
  event
}
