import { gql } from 'apollo-server-express'

export default gql`
  type DepartmentUser {
    id: ID!
    userId: ID!
    departmentId: ID!
    departmentRole: String!
    isActive: Boolean
  }

  extend type Mutation {

    inviteMember(email: String!, role: String!): Boolean

  }
`
