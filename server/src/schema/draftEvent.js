import { gql } from 'apollo-server-express'

export default gql`
  type DraftEvent {
    id: ID!
    thumbnail:          String
    title:              String
    location:           String
    categoryId:         String
    shortDesc:          String
    description:        String
    orgName:            String
    orgDesc:            String
    ctTelephone:        Int
    ctEmail:            String
    eventTime:          [Int]
    regTime:            [Int]
    amountOfTicket:     Int
    slug:               String
    ownerId:            String
    approvedBy:         String
    createdAt:          String
    updatedAt:          String
    user:               User
    approver:           User
  }

  type DraftEventConnection {
    edges: [DraftEvent!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    draftEvent(id: ID!): DraftEvent
    draftEvents(cursor: String, limit: Int): DraftEventConnection!
  }

  extend type Mutation {
    createDraftEvent(
      thumbnail:          String
      title:              String
      location:           String
      categoryId:         String
      shortDesc:          String
      description:        String
      orgName:            String
      orgDesc:            String
      ctTelephone:        Int
      ctEmail:            String
      eventTime:          [Int]
      regTime:            [Int]
      amountOfTicket:     Int
    ): DraftEvent

    updateDraftEvent(
      id: ID!
      thumbnail:          String
      title:              String
      location:           String
      categoryId:         String
      shortDesc:          String
      description:        String
      orgName:            String
      orgDesc:            String
      ctTelephone:        Int
      ctEmail:            String
      eventTime:          [Int]
      regTime:            [Int]
      amountOfTicket:     Int
    ): DraftEvent

    deleteDraftEvent(id: ID!): Boolean
  }
`