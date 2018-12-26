import gql from 'graphql-tag'

const GET_PAGINATED_EVENTS_WITH_USERS = gql`
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

const GET_EVENT_DETAIL = gql`
  query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      description
      shortDescription
      images {
        thumbnail
      }
      createdAt
      organizationName
      organizationLogo 
      organizationDescription
      startTime
      endTime
      location
      user {
        id
        username
        email
      }
    }
  }
`

export {
  GET_PAGINATED_EVENTS_WITH_USERS,
  GET_EVENT_DETAIL
}