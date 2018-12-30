import { event as eventQueries } from './query'
import { event as eventMutations } from './mutation'

const event = {
  ...eventQueries,
  ...eventMutations
}

export {
  event
}