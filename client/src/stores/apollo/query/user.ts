import gql from 'graphql-tag'

export const GET_ALL_USERS = gql`
  {
    users {
      id
      username
      email
      role
      firstname
      lastname
      isActivated
    }
  }
`

export const GET_MY_DEPARTMENT = gql`
  query($departmentId: ID!) {
    myDepartment(departmentId: $departmentId) {
      departmentRole
      department {
        name
        description
      }
    }
  }
`
