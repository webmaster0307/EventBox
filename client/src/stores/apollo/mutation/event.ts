import gql from 'graphql-tag'

const CREATE_EVENT = gql`
  mutation(
    $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,
    $organizationName: String!, $organizationLogo: String!, $organizationDescription: String!,
    $startTime: String!, $endTime: String!, $location: String!, $address: String
  ) {
    createEvent(
      title: $title, thumbnail: $thumbnail, description: $description, shortDescription: $shortDescription,
      organizationName: $organizationName, organizationLogo: $organizationLogo,
      organizationDescription: $organizationDescription,
      startTime: $startTime, endTime: $endTime, location: $location, address: $address
    ) {
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
  }
`

const UPDATE_EVENT_BYID = gql`
  mutation(
    $id: ID!, $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,
    $organizationName: String!, $organizationLogo: String!, $organizationDescription: String!,
    $startTime: String!, $endTime: String!, $location: String!, $address: String!
  ) {
    updateEvent(
      id: $id, title: $title, thumbnail: $thumbnail,
      description: $description, shortDescription: $shortDescription
      organizationName: $organizationName, organizationLogo: $organizationLogo,
      organizationDescription: $organizationDescription,
      startTime: $startTime, endTime: $endTime, location: $location, address: $address
    ) {
      title
      description
      shortDescription
      images {
        thumbnail
      }
      createdAt
      user {
        id
        username
        email
      }
    }
  }
`

const DELETE_EVENT_BYID = gql`
  mutation($id: ID!){
    deleteEvent(id: $id)
  }
`

export {
  CREATE_EVENT,
  UPDATE_EVENT_BYID,
  DELETE_EVENT_BYID
}