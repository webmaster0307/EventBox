import { event as eventQueries, user as userQueries } from './query'
import { event as eventMutations, user as userMutations } from './mutation'

const event = {
  ...eventQueries,
  ...eventMutations
}

const user = {
  ...userQueries,
  ...userMutations
}

export {
  event,
  user
}