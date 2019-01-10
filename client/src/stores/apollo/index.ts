import {
  user as userQueries,
  event as eventQueries,
  department as departmentQueries,
  session as sessionQueries
} from './query'
import {
  user as userMutations,
  event as eventMutations,
  department as departmentMutations
} from './mutation'

const event = {
  ...eventQueries,
  ...eventMutations
}

const user = {
  ...userQueries,
  ...userMutations
}

const department = {
  ...departmentQueries,
  ...departmentMutations
}

const session = {
  ...sessionQueries
}

export {
  event,
  user,
  department,
  session
}