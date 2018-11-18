import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      id
      username
      email
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  {
    users{
      id,
      username,
      email,
      role,
      events{
        text,
        createdAt
      }
    }
  }
`