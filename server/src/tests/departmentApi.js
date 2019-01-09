import axios from 'axios'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

export const departments = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        query ($limit: Int!) {
          departments(limit: $limit) {
            name
            description
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