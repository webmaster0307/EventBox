export default `
  extend type Query {
    loading: Bool
    getSession: Session!
  }
  Session {
    me: User
  }
  Department {
    id: ID!
    name: String
  }
  User {
    id: ID!
    username: String!
    email: String!
    role: [String]
    departments: [Department]
    firstname: String
    lastname: String
    photo: String
    phoneNumber: String
    createdAt: String
  }
`
