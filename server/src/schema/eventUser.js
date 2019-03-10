import { gql } from 'apollo-server-express'

export default gql`
  type EventUser {
    id: ID!
    userId: ID!
    eventId: ID!
    code: String
    ticketSvgrc: String
    checkedIn: Boolean
    checkedInTime: Date
    userInfo: User
    eventInfo: Event
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    checkTicket(code: String!, eventId: ID!): EventUser
  }

  extend type Mutation {
    submitTicket(code: String!, eventId: ID!): EventUser
  }
`
