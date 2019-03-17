import gql from 'graphql-tag'
import { session as sessionQueries } from '@gqlQueries'

export default {
  Mutation: {
    toggleLoading: (_: any, variables: any, { cache }: { cache: any }) => {
      const query = gql`
        query {
          loading @client
        }
      `
      const { loading } = cache.readQuery({ query })
      const data = {
        loading: !loading
      }
      cache.writeData({ data })
      return null
    },
    setSession: (_: any, variables: any, { cache }: { cache: any }) => {
      const { session } = variables
      const data = {
        session: {
          me: {
            ...session.me,
            __typename: 'User'
          },
          __typename: 'Session'
        }
      }
      cache.writeData({ data })
      return null
    },
    updateAvatar: (_: any, variables: any, { cache }: { cache: any }) => {
      const { photo } = variables
      const current = cache.readQuery({
        query: sessionQueries.GET_LOCAL_SESSION
      })
      const data = {
        session: {
          me: {
            ...current.me,
            photo
          },
          __typename: 'Session'
        }
      }
      cache.writeData({ data })

      return true
    }
  }
}
