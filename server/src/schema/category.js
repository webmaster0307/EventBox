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
    createCategory(
      name: String!,
      description: String
    ): Category

    updateCategory(
      id: ID!,
      name: String,
      description: String
    ): Category

    deleteCategory(id: ID!): Boolean
  }
`
