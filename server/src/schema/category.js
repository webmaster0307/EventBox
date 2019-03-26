import { gql } from 'apollo-server-express'

export default gql`
  type Category {
    id: ID!
    name: String!
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    category(id: ID!): Category
    categories(cursor: String, limit: Int): [Category]
  }

  extend type Mutation {
    createCategory(name: String!, description: String): Category

    updateCategory(id: ID!, name: String, description: String): Category

    deleteCategory(id: ID!): Boolean
  }
`
