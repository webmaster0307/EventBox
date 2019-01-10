import axios from 'axios'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

export const event = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        query ($id: ID!) {
            event(id: $id) {
                    title
                    images{
                        thumbnail
                    }
                    shortDescription
                    description
                    organizationName
                    organizationLogo
                    organizationDescription
                    startTime
                    endTime
                    location
                    address
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
