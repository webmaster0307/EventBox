import axios from 'axios'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

export const events = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
      query ($limit: Int! , status:"String!") {
        events(status:"draft",limit:1) {
            edges{
                id
                images {
                  thumbnail
                }
                title
                status
                createdAt
                user {
                  username
                }
            }
      }   
      `,
      variables
    },
    token ? {headers: {'x-token':token}} : null
  )
