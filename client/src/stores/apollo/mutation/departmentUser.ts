import gql from "graphql-tag";

const INVITE_TO_DEPARTMENT = gql`
  mutation($email: String!, $role: String!) {
    inviteMember(email: $email, role: $role) {
      id
      name,
      updatedAt
    }
  }
`

export {
  INVITE_TO_DEPARTMENT
}