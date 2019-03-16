import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`

export const USER_UPLOAD_AVATAR = gql`
  mutation($file: Upload!) {
    photoUpload(file: $file)
  }
`

export const USER_UPDATE_PROFILE = gql`
  mutation($firstname: String!, $lastname: String!, $phoneNumber: String!) {
    updateProfie(firstname: $firstname, lastname: $lastname, phoneNumber: $phoneNumber)
  }
`
