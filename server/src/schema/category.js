import { gql } from 'apollo-server-express'

export default gql`
  type Category {
    id: ID!
    name: String!
    description: String
  }

  extend type Query {
    category(id: ID!): Category
    categories: [Category]
  }

  extend type Mutation {
    addCategory(name: String!, description: String): Category
    updateCategory(id: ID!, name: String, description: String): Category
    removeCategory(id: ID!): Boolean
  }
`
