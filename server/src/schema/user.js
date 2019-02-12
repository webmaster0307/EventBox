import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    email: String!
    username: String!
    firstname: String
    lastname: String
    department: String
    phoneNumber: Int
    secret: String
    role: [String]
    events: [Event!]
    departments: [Department]
    isActivated: Boolean
  }

  type Token {
    token: String!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(
      username: String!,
      password: String!
    ): Token!

    updateUser(
      id: ID!
      username: String!
      password: String
      firstname: String
      lastname: String
      department: String
      phoneNumber: Int
      secret: String
      role: [String]
    ): User!

    activateUser(
      token: String
    ): Boolean

    deleteUser(id: ID!): Boolean!
  }

  extend type Subscription {
    myNotification: Event
  }
`
