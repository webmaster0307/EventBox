import gql from "graphql-tag";

const INVITE_TO_DEPARTMENT = gql`
  mutation($departmentId: ID!, $email: String!, $role: String!) {
    inviteMember(departmentId: $departmentId, email: $email, role: $role) {
      id
      user {
        id
        email
        username
      }
    }
  }
`

const REMOVE_FROM_DEPARTMENT = gql`
  mutation($departmentId: ID!, $userId: ID!) {
    removeMember(departmentId: $departmentId, userId: $userId)
  }
`

export {
  INVITE_TO_DEPARTMENT,
  REMOVE_FROM_DEPARTMENT
}