import { 
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