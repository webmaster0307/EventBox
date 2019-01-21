import axios from 'axios'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
          token
        }
      }
    `,
    variables
  })

export const me = async token =>
  await axios.post(
    API_URL,
    {
      query: `
        {
          me {
            id
            email
            username
          }
        }
      `
    },
    token
      ? {
        headers: {
          'x-token': token
        }
      }
      : null
  )

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
          role
        }
      }
    `,
    variables
  })

export const users = async (variables,token) =>
  axios.get(API_URL, {
    query: `
      {
        users{
          id
          username
          email
          role
        }
      }
    `,variables
  },token
  ? {
    headers: {
      'x-token': token
    }
  }
  : null)

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $username: String!,
        $email: String!,
        $password: String!
      ) {
        signUp(
          username: $username,
          email: $email,
          password: $password
        ) 
      }
    `,
    variables
  },token
  ? {
    headers: {
      'x-token': token
    }
  }
  : null
)

export const updateUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
      mutation ( $id: ID!, $username: String!, $password: String, $firstname: String, $lastname: String, $department: String,
        $phoneNumber: Int, $secret: String, $role: [String]) {
        updateUser(id: $id, username: $username, password: $password, firstname: $firstname, lastname: $lastname, department: $department,
          phoneNumber: $phoneNumber, secret: $secret, role: $role) {
          id
          username
          email
          role
          }
        }
      `,
      variables
    },
    token
      ? {
        headers: {
          'x-token': token
        }
      }
      : null
  )

export const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables
    },
    token
      ? {
        headers: {
          'x-token': token
        }
      }
      : null
)
export const createEvent = async (variables, token) =>
await axios.post(API_URL, {
  query: `
  mutation(
    $title: String!, $thumbnail: String!, $description: String!,$organizationName: String!)
  {
    createEvent(
      title: $title
      thumbnail: $thumbnail
      description: $description
      organizationName: $organizationName
    )
    {
      title
      images {
        thumbnail
      }
      description
      organizationName
    }
  }
  `,
  variables
}, token
    ? {
      headers: {
        'x-token': token
      }
    }
    : null

)

