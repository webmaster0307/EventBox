import gql from 'graphql-tag'

const CREATE_EVENT = gql`
  mutation(
    $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,
    $organizationName: String!, $organizationLogo: String!, $organizationDescription: String!,
    $startTime: String!, $endTime: String!, $location: String!
  ) {
    createEvent(
      title: $title, thumbnail: $thumbnail, description: $description, shortDescription: $shortDescription,
      organizationName: $organizationName, organizationLogo: $organizationLogo, 
      organizationDescription: $organizationDescription,
      startTime: $startTime, endTime: $endTime, location: $location
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

export {
  CREATE_EVENT
}