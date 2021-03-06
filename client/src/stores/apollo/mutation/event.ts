import gql from 'graphql-tag'

const CREATE_EVENT = gql`
  mutation(
    $title: String!
    $thumbnail: String!
    $description: String!
    $rawHtmlContent: String!
    $shortDescription: String
    $maxTickets: Int!
    $categories: [ID]
    $registerEndAt: String!
    $organizationName: String!
    $organizationLogo: String!
    $organizationDescription: String!
    $startTime: Date!
    $endTime: Date!
    $location: String!
    $address: String
  ) {
    createEvent(
      title: $title
      thumbnail: $thumbnail
      description: $description
      rawHtmlContent: $rawHtmlContent
      shortDescription: $shortDescription
      maxTickets: $maxTickets
      registerEndAt: $registerEndAt
      categories: $categories
      organizationName: $organizationName
      organizationLogo: $organizationLogo
      organizationDescription: $organizationDescription
      startTime: $startTime
      endTime: $endTime
      location: $location
      address: $address
    ) {
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

const UPDATE_EVENT_BYID = gql`
  mutation(
    $id: ID!
    $title: String!
    $thumbnail: String!
    $description: String!
    $maxTickets: Int!
    $registerStartAt: Date
    $registerEndAt: Date!
    $categories: [ID]
    $rawHtmlContent: String!
    $shortDescription: String
    $organizationName: String!
    $organizationLogo: String!
    $organizationDescription: String!
    $startTime: Date!
    $endTime: Date!
    $location: String!
    $address: String!
  ) {
    updateEvent(
      id: $id
      title: $title
      thumbnail: $thumbnail
      description: $description
      maxTickets: $maxTickets
      registerStartAt: $registerStartAt
      registerEndAt: $registerEndAt
      categories: $categories
      rawHtmlContent: $rawHtmlContent
      shortDescription: $shortDescription
      organizationName: $organizationName
      organizationLogo: $organizationLogo
      organizationDescription: $organizationDescription
      startTime: $startTime
      endTime: $endTime
      location: $location
      address: $address
    ) {
      status
      updatedAt
    }
  }
`

const DELETE_EVENT_BYID = gql`
  mutation($id: ID!) {
    deleteEvent(id: $id)
  }
`

const PUBLISH_EVENT_BYID = gql`
  mutation($id: ID!, $departmentIds: [ID]!) {
    publishEvent(id: $id, departmentIds: $departmentIds) {
      departments {
        id
        name
      }
      status
      updatedAt
    }
  }
`

const APPROVE_EVENT_BYID = gql`
  mutation($id: ID!) {
    approveEvent(id: $id)
  }
`

const REJECT_EVENT_BYID = gql`
  mutation($id: ID!) {
    rejectEvent(id: $id)
  }
`

const JOIN_EVENT = gql`
  mutation($eventId: ID!, $fullName: String!, $studentId: String!) {
    joinEvent(eventId: $eventId, fullName: $fullName, studentId: $studentId) {
      code
      ticketSvgSrc
    }
  }
`

const PUBLISH_DIRECTLY = gql`
  mutation($eventId: ID!) {
    publishDirectly(eventId: $eventId) {
      id
      status
    }
  }
`

export {
  CREATE_EVENT,
  UPDATE_EVENT_BYID,
  DELETE_EVENT_BYID,
  PUBLISH_EVENT_BYID,
  APPROVE_EVENT_BYID,
  REJECT_EVENT_BYID,
  JOIN_EVENT,
  PUBLISH_DIRECTLY
}
