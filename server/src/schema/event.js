import { gql } from 'apollo-server-express'

export default gql`
  type Event {
    id: ID!
    title: String!
    slug: String!
    description: String!
    rawHtmlContent: String!
    shortDescription: String!
    user: User
    departments: [Department]
    categories: [Category]
    images: EventImages!
    registerStartAt: Date
    registerEndAt: Date
    maxTickets: Int
    approvedBy: User
    organizationName: String!
    organizationLogo: String
    organizationDescription: String
    startTime: Date
    endTime: Date
    participants: [String]
    location: String
    address: String
    status: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type EventImages {
    thumbnail: String
  }

  type EventConnection {
    edges: [Event!]!
    pageInfo: PageInfo
  }

  type EventReviewConnection {
    edges: [Event!]
    departmentIds: [String]
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type EventCreated {
    event: Event!
  }

  type EventUpdate {
    _id: ID
    participants: [ID]
  }

  type EventTicket {
    id: ID!
    code: String!
    ticketSvgSrc: String!
    checkedIn: Boolean!
    userId: ID!
    eventId: ID!
    checkedInTime: Date
  }

  type countResult {
    entertainment: Int
    learning: Int
    others: Int
  }

  extend type Query {
    events(status: String, cursor: String, limit: Int): EventConnection!
    eventsHome(limit: Int): [Event]
    eventsInReview(page: Int, limit: Int): EventReviewConnection!
    event(id: ID!): Event
    countEventByType: countResult
    eventsForSearch: [String]
    eventsForCheckin: [Event]
  }

  extend type Mutation {
    createEvent(
      title: String!
      thumbnail: String!
      description: String!
      rawHtmlContent: String!
      shortDescription: String
      categoryId: String
      registerStartAt: String
      registerEndAt: String!
      maxTickets: Int!
      categories: [ID]
      organizationName: String!
      organizationLogo: String
      organizationDescription: String
      startTime: Date
      endTime: Date
      location: String
      address: String
      departments: [ID]
    ): Event!

    updateEvent(
      id: ID!
      title: String!
      thumbnail: String!
      description: String!
      maxTickets: Int!
      registerStartAt: Date
      registerEndAt: Date!
      categories: [ID]
      rawHtmlContent: String!
      shortDescription: String
      categoryId: String
      location: String
      regFrom: String
      regTo: String
      organizationName: String!
      organizationLogo: String
      organizationDescription: String
      startTime: Date
      endTime: Date
      location: String
      address: String
    ): Event!

    deleteEvent(id: ID!): Boolean!

    publishEvent(id: ID!, departmentIds: [ID]!): Event

    approveEvent(id: ID!): Boolean!
    rejectEvent(id: ID!): Boolean!

    joinEvent(eventId: ID!): EventTicket!
    unjoinEvent(userId: ID!, eventId: ID!): Event!

    publishDirectly(eventId: ID!): Event
  }

  extend type Subscription {
    eventCreated: EventCreated!
    eventSubmited(departmentIds: [ID]!): Event
    eventUpdate: EventUpdate
    eventCheckedIn(eventId: ID!): Ticket
  }
`
