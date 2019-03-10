import { gql } from 'apollo-server-express'

export default gql`
  type EventUser {
    id: ID!
    userId: ID!
    eventId: ID!
    code: String
    ticketSvgSrc: String
    checkedIn: Boolean
    checkedInTime: Date
    userInfo: User
    eventInfo: Event
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    tickets(eventId: ID!): [EventUser]
    checkTicket(code: String!, eventId: ID!): EventUser
  }

  extend type Mutation {
    submitTicket(code: String!, eventId: ID!): EventUser
  }
`
