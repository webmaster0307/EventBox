import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    events(cursor: String, limit: Int): EventConnection!
    event(id: ID!): Event
  }

  extend type Mutation {
    createEvent(title: String!, thumbnail: String!, description: String!): Event!
    updateEvent(id: ID!, title: String!, thumbnail: String!, description: String!): Event!
    deleteEvent(id: ID!): Boolean!
  }

  type EventConnection {
    edges: [Event!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    slug: String!
    user: User!
    images: EventImages!
    createdAt: String!
    updatedAt: String!
  }

  type EventImages {
    thumbnail: String
  }

  extend type Subscription {
    eventCreated: EventCreated!
  }

  type EventCreated {
    event: Event!
  }
`
