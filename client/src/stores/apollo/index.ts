import {
  user as userQueries,
  event as eventQueries,
  department as departmentQueries,
  session as sessionQueries,
  departmentUser as departmentUserQueries
} from './query'
import {
  user as userMutations,
  event as eventMutations,
  department as departmentMutations,
  departmentUser as departmentUserMutations
} from './mutation'
import {
  event as eventSubscriptions
} from './subscription'

const event = {
  ...eventQueries,
  ...eventMutations,
  ...eventSubscriptions
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

const departmentUser = {
  ...departmentUserQueries,
  ...departmentUserMutations
}

export {
  event,
  user,
  department,
  session,
  departmentUser
}