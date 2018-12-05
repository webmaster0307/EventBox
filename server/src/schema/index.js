import { gql } from 'apollo-server-express'


import categorySchema from './category'
import contactSchema from './contact'
import departmentSchema from './department'
import draftEventSchema from './draftEvent'
import eventSchema from './event'
import userSchema from './user'

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
`

export default [
  linkSchema,
  categorySchema,
  contactSchema,
  departmentSchema,
  draftEventSchema,
  eventSchema,
  userSchema
]
