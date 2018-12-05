import { gql } from 'apollo-server-express'

export default gql`
  type DraftEvent {
    id: ID!
    title: String
    slug: String
    description: String
    shortDescription: String
    user: User
    categoryId: String
    images: EventImages
    location: String
    regFrom: String
    regTo: String
    approvedBy: User
    createdAt: String
    updatedAt: String
  }

  input optDraftEventInput {
    title: String
    slug: String
    description: String
    shortDescription: String
    user: InputUser
    categoryId: String
    images: EventImagesInput
    location: String
    regFrom: String
    regTo: String
    approvedBy: InputUser
  }

  input InputUser {
    id: ID!
    firstname: String
    lastname: String
  }

  input EventImagesInput {
    thumbnail: String
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
