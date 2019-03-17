import gql from 'graphql-tag'

const GET_USERS_BY_DEPARTMENT = gql`
  query($departmentId: ID!) {
    usersOfDepartment(departmentId: $departmentId) {
      id
      username
      email
    }
  }
`

export { GET_USERS_BY_DEPARTMENT }
