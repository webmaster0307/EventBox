import { event as eventQueries } from './query'
import { event as eventMutations } from './mutation'
import { user as userMutations } from './mutation'

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