import gql from 'graphql-tag'

export const GET_ALL_USERS = gql`
  {
    users {
      id username email role firstname lastname isActivated
    }
  }
`