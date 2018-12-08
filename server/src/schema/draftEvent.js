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
    images: [String]
    location: String
    regFrom: String
    regTo: String
    approvedBy: String
    createdAt: String
    updatedAt: String
    user: User
    approver: User
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
      title: String
      slug: String
      description: String
      shortDescription: String
      userId: String
      categoryId: String
      images: [String]
      location: String
      regFrom: String
      regTo: String
      approvedBy: String
    ): DraftEvent

    updateDraftEvent(
      id: ID!,
      title: String
      slug: String
      description: String
      shortDescription: String
      userId: String
      categoryId: String
      images: [String]
      location: String
      regFrom: String
      regTo: String
      approvedBy: String
    ): DraftEvent

    deleteDraftEvent(id: ID!): Boolean
  }
`
