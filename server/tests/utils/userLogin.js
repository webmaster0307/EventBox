import { API_URL } from './'
import axios from 'axios'

export default async (variables) => {
  try {
    const {
      data: {
        data: { signIn }
      }
    } = await axios.post(API_URL, {
      query: `
        mutation ($username: String!, $password: String!) {
          signIn(username: $username, password: $password) {
            token
          }
        }
      `,
      variables
    })
    return signIn
  } catch (error) {
    console.log('error: ', error.response.data)
  }
}
