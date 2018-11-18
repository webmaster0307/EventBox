import gql from 'graphql-tag';

const getSession = gql`
  query getSession @client{
    me {
      id
      username
      email
      role
    }
  }
`

export {
  getSession
}