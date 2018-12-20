import gql from 'graphql-tag'

const GET_SESSION = gql`
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
  GET_SESSION
}