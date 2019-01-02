import gql from 'graphql-tag'

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser (id: $id)
  }
`
