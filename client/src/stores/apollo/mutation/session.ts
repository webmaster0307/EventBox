import gql from 'graphql-tag'

const UPDATE_ME_AVATAR = gql`
  mutation($photo: String!) {
    updateAvatar(photo: $photo) @client
  }
`

export { UPDATE_ME_AVATAR }
