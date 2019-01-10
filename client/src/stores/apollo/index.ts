import {
  user as userQueries,
  event as eventQueries,
  department as departmentQueries,
  session as sessionQueries
} from './query'
import { 
  user as userMutations, 
  event as eventMutations,
  department as departmentMutations,
  departmentUser as departmentUserMutations
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

const departmentUser = {
  ...departmentUserMutations
}

export {
  event,
  user,
  department,
  session,
  departmentUser
}