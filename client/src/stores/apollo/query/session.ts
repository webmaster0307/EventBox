import gql from 'graphql-tag'

const GET_ME = gql`
  {
    me {
      id
      username
      email
      role
    }
  }
`

const GET_LOCAL_SESSION = gql`
  query getSession {
    me @client {
      id
      username
      email
      role
    }
  }
`

export {
  GET_ME,
  GET_LOCAL_SESSION
}