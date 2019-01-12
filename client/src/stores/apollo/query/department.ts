import gql from "graphql-tag";

const GET_PAGINATED_DEPARTMENTS = gql`
  query($page: Int, $limit: Int!) {
    departments(page: $page, limit: $limit){
      id
      name
      updatedAt
    }
  }
`

const GET_EVENT_DEPARTMENTS = gql`
  query {
    eventDepartments {
      id
      name
    }
  }
`

const GET_DEPARTMENT_BYID = gql`
  query($id: ID!) {
    department(id: $id){
      id
      name
      description
    }
  }
`

const GET_USERS_BY_DEPARTMENT = gql`
  query($departmentId: ID!){
    userOfDepartments(departmentId: $departmentId){
      id
      username
      email
    }
  }
`

export {
  GET_PAGINATED_DEPARTMENTS,
  GET_EVENT_DEPARTMENTS,
  GET_DEPARTMENT_BYID,
  GET_USERS_BY_DEPARTMENT
}