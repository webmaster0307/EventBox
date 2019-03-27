import {
  user as userQueries,
  event as eventQueries,
  department as departmentQueries,
  session as sessionQueries,
  departmentUser as departmentUserQueries,
  ticket as ticketQueries,
  category as categoryQueries
} from './query'
import {
  session as sessionMutations,
  user as userMutations,
  event as eventMutations,
  department as departmentMutations,
  departmentUser as departmentUserMutations
} from './mutation'
import { event as eventSubscriptions, ticket as ticketSubscriptions } from './subscription'

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
  ...sessionQueries,
  ...sessionMutations
}

const departmentUser = {
  ...departmentUserQueries,
  ...departmentUserMutations
}

const ticket = {
  ...ticketQueries,
  ...ticketSubscriptions
}

const category = {
  ...categoryQueries
}

export { event, user, department, session, departmentUser, ticket, category }
