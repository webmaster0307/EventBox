import {
  user as userQueries,
  event as eventQueries,
  department as departmentQueries
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

export {
  event,
  user,
  department
}