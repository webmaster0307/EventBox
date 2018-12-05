import { gql } from 'apollo-server-express'

export default gql`
  type Contact {
    id: ID!
    eula: String
    description: String
    address: String
    phoneNumber: [Int]
  }

  input OptContactInput {
    eula: String
    description: String
    address: String
    phoneNumber: [Int]
  }

  extend type Query {
    contact(id: ID!): Contact
  }

  extend type Mutation {
    addContact(optional: OptContactInput): Contact
    updateContact(id: ID!, optional: OptContactInput): Contact
    removeContact(id: ID!): Boolean
  }
`
