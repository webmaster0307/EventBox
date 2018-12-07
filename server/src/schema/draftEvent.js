import { gql } from 'apollo-server-express'

export default gql`
  type DraftEvent {
    id: ID!
    title: String
    slug: String
    description: String
    shortDescription: String
    userId: String
    categoryId: String
    images: EventImages
    location: String
    regFrom: String
    regTo: String
    approvedBy: String
    createdAt: String
    updatedAt: String
    user: User
    approver: User
  }

  input optDraftEventInput {
    title: String
    slug: String
    description: String
    shortDescription: String
    categoryId: String
    location: String
    regFrom: String
    regTo: String
    approvedBy: String
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
    createDraftEvent(optional: optDraftEventInput): DraftEvent
    updateDraftEvent(id: ID!, optional: optDraftEventInput): DraftEvent
    deleteDraftEvent(id: ID!): Boolean
  }
`
