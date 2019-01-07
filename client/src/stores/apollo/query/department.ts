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

export {
  GET_PAGINATED_DEPARTMENTS
}