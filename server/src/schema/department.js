import { gql } from 'apollo-server-express'

export default gql`
  type Department {
    id: ID!
    name: String!
    description: String
  }

  extend type Query {
    department(id: ID!): Department
    departments: [Department]
  }

  extend type Mutation {
    createDepartment(
      name: String!,
      description: String
    ): Department

    updateDepartment(
      id: ID!,
      name: String,
      description: String
    ): Department

    deleteDepartment(id: ID!): Boolean
  }
`
