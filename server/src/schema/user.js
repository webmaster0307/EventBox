import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    email: String!
    username: String!
    firstname: String
    lastname: String
    department: String
    phoneNumber: String
    photo: String
    secret: String
    role: [String]
    events: [Event!]
    departments: [Department]
    isActivated: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Token {
    token: String!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    myDepartment(departmentId: ID!): DepartmentUser
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Boolean

    signIn(username: String!, password: String!, type: Int): Token!

    updateUser(
      id: ID!
      firstname: String
      lastname: String
      phoneNumber: String
      role: [String]
    ): User!

    activateUser(token: String): Boolean

    deleteUser(id: ID!): Boolean!

    photoUpload(file: Upload!): String
    updateProfie(firstname: String!, lastname: String!, phoneNumber: String!): Boolean
  }

  extend type Subscription {
    myNotification: Event
  }
`
