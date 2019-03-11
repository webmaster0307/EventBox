import { gql } from 'apollo-server-express'

import categorySchema from './category'
import contactSchema from './contact'
import departmentSchema from './department'
import eventSchema from './event'
import userSchema from './user'
import departmentuserSchema from './departmentUser'
import ticketSchema from './ticket'

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  scalar Date
`

export default [
  linkSchema,
  categorySchema,
  contactSchema,
  departmentSchema,
  eventSchema,
  userSchema,
  departmentuserSchema,
  ticketSchema
]
