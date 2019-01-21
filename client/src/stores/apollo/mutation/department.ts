import gql from "graphql-tag";

const CREATE_DEPARTMENT = gql`
  mutation($name: String!, $description: String!) {
    createDepartment(name: $name, description: $description) {
      id
      name
      updatedAt
    }
  }
`

export {
  CREATE_DEPARTMENT
}