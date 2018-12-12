import { gql } from 'apollo-server-express'

export default gql`
  type Contact {
    id: ID!
    eula: String
    description: String
    address: String
    phoneNumber: String
  }

  extend type Query {
    contact(id: ID!): Contact
  }

  extend type Mutation {
    createContact(
      eula: String
      description: String
      address: String
      phoneNumber: String
    ): Contact

    updateContact(
      id: ID!,
      eula: String
      description: String
      address: String
      phoneNumber: String
    ): Contact

    deleteContact(id: ID!): Boolean
  }
`
