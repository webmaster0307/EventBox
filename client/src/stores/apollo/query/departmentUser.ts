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
// departmentUsers(cursor: String, limit: Int, userId: ID, departmentId: ID): [DepartmentUser]
const GET_DEPARTMENT_USERS = gql`
  query($cursor: String, $limit: Int, $userId: ID, $departmentId: ID, $role: String) {
    departmentUsers(
      cursor: $cursor
      limit: $limit
      userId: $userId
      departmentId: $departmentId
      role: $role
    ) {
      id
      user {
        id
        username
        email
        photo
      }
      departmentRole
      updatedAt
    }
  }
`

export { GET_USERS_BY_DEPARTMENT, GET_DEPARTMENT_USERS }
