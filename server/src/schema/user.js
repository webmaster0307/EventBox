import { gql } from 'apollo-server-express'

export default gql`
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

    signIn(username: String!, password: String!): Token!
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
      #events: [Event!]
      ): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

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
  }
`
