import axios from 'axios'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

export const detailEvent = async (variables, token) => await axios.post(API_URL, {
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
      `, variables
}, token ? { headers: { 'x-token': token } } : null);
export const listEventsHomepage = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        query ($status: String, $limit: Int) {
            events(status: $status, limit: $limit) {
                edges{
                  id
                  images{
                    thumbnail
                  }
                  title
                  status
                  createdAt
                  user{
                    username
                  }
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
export const createEvent = async (variables, token) =>
  await axios.post(API_URL, {
    query: `
    mutation(
      $title: String!, $images: EventImages!, $description: String!,$organizationName: String!) 
    {
      createEvent(
        title:$title
        images: $images
        description: $description
        organizationName:$organizationName
      )
      {
        title
        description
        images {
          thumbnail
        }
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


export const personalEvent = async (variables, token) =>
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
              status
      				user{
                username
              }
      				updatedAt
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
