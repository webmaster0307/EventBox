import axios from 'axios'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

export const events = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        query ($status: String, $limit: Int) {
            events(status: $status, limit: $limit) {
                edges{
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