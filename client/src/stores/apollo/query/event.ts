import gql from 'graphql-tag'

const GET_PAGINATED_EVENTS_WITH_USERS = gql`
  query($status: String, $cursor: String, $limit: Int) {
    events(status: $status, cursor: $cursor, limit: $limit) @connection(key: "EventConnection") {
      edges {
        id
        title
        slug
        status
        images {
          thumbnail
        }
        createdAt
        updatedAt
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

const GET_EVENTS_HOMEPAGE = gql`
  query {
    eventsHome {
      id
      title
      slug
      status
      images {
        thumbnail
      }
      createdAt
      updatedAt
      user {
        id
        username
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
      departments {
        id
        name
      }
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
      address
      user {
        id
        username
        email
      }
      status
    }
  }
`

const GET_EVENTS_INREVIEW = gql`
  query($page: Int, $limit: Int) {
    eventsInReview(page: $page, limit: $limit) @connection(key: "EventReviewConnection") {
      edges {
        id
        title
        slug
        status
        images {
          thumbnail
        }
        updatedAt
        user {
          id
          username
        }
      }
      departmentIds
    }
  }
`

export {
  GET_PAGINATED_EVENTS_WITH_USERS,
  GET_EVENTS_HOMEPAGE,
  GET_EVENT_DETAIL,
  GET_EVENTS_INREVIEW
}
