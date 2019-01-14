import gql from 'graphql-tag'

const SUBCRIBE_EVENT_REVIEW = gql`
  subscription($departmentIds: [ID]!) {
    eventSubmited(departmentIds: $departmentIds) {
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

export {
  SUBCRIBE_EVENT_REVIEW
}