import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  query($cursor: String, $limit: Int) {
    categories(cursor: $cursor, limit: $limit) {
      id
      name
    }
  }
`

export { GET_CATEGORIES }
