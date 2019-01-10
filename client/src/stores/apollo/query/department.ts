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

export {
  GET_PAGINATED_DEPARTMENTS,
  GET_EVENT_DEPARTMENTS
}