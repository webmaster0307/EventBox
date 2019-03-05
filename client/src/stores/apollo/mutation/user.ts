import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser (id: $id)
  }
`