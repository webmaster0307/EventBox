import { event as eventQueries } from './query'
import { user as userMutations, event as eventMutations } from './mutation'

const event = {
  ...eventQueries,
  ...eventMutations
}

const user = {
  ...userMutations
}

export {
  event,
  user
}