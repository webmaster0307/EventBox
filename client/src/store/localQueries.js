import gql from 'graphql-tag'

export const GET_PAGINATED_EVENTS_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    events(cursor: $cursor, limit: $limit)
      @connection(key: "EventConnection") {
      edges {
        id
        title
        description
        status
        images {
          thumbnail
        }
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`