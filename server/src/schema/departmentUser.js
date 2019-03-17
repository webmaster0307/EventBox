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
    departmentuserList(page: Int, limit: Int!): [DepartmentUser]
    departmentuser(id: ID!): DepartmentUser
    usersOfDepartment(departmentId: ID!): [User]
  }

  extend type Mutation {
    inviteMember(departmentId: ID!, email: String!, role: String!): DepartmentUser
    removeMember(departmentId: ID!, userId: ID!): Boolean!
  }
`
