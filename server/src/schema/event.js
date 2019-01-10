import { gql } from 'apollo-server-express'

export default gql`
  type Event {
    id: ID!
    title: String!
    slug: String!
    description: String!
    shortDescription: String!
    user: User
    departments: [Department]
    categoryId: String
    images: EventImages!
    regFrom: String
    regTo: String
    approvedBy: User
    organizationName: String!
    organizationLogo: String
    organizationDescription: String
    startTime: String
    endTime: String
    location: String
    address: String
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type EventImages {
    thumbnail: String
  }

  type EventConnection {
    edges: [Event!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type EventCreated {
    event: Event!
  }

  extend type Query {
    events(status: String, cursor: String, limit: Int): EventConnection!
    event(id: ID!): Event
  }

  extend type Mutation {
    createEvent(
      title: String!
      thumbnail: String!
      description: String!
      shortDescription: String
      categoryId: String
      regFrom: String
      regTo: String
      organizationName: String!
      organizationLogo: String
      organizationDescription: String
      startTime: String
      endTime: String
      location: String
      address: String
      departments: [ID]
    ): Event!

    updateEvent(
      id: ID!
      title: String!
      thumbnail: String!
      description: String!
      shortDescription: String
      categoryId: String
      location: String
      regFrom: String
      regTo: String
      organizationName: String!
      organizationLogo: String
      organizationDescription: String
      startTime: String
      endTime: String
      location: String
      address: String
    ): Event!

    deleteEvent(id: ID!): Boolean!

    publishEvent(id: ID!): Boolean!
  }

  extend type Subscription {
    eventCreated: EventCreated!
  }
`
