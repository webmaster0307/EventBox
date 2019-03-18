import { gql } from 'apollo-server-express'

export default gql`
  type DepartmentUser {
    id: ID!
    user: User!
    department: Department!
    departmentRole: String!
    isActive: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    usersOfDepartment(departmentId: ID!): [User]
    departmentUsers(
      cursor: String
      limit: Int
      userId: ID
      departmentId: ID
      role: String
    ): [DepartmentUser]
  }

  extend type Mutation {
    inviteMember(departmentId: ID!, email: String!, role: String!): DepartmentUser
    removeMember(departmentId: ID!, userId: ID!): Boolean!
  }
`
