import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
const { createUploadLink } = require('apollo-upload-client')

import { signOut } from '@components'
import { session as sessionQueries } from '@gqlQueries'
import gql from 'graphql-tag'

// const prodMode = process.env.NODE_ENV === 'production'

// const httpLink = new HttpLink({
//   uri: '/graphql'
// })
const httpLink = createUploadLink({ uri: '/graphql' })

const WS_ENDPOINT = process.env.REACT_APP_GRAPHQL_SUBSCRIPTION || 'ws://localhost:8000/graphql'
const ws_client = new SubscriptionClient(WS_ENDPOINT, {
  reconnect: true
})
const wsLink = new WebSocketLink(ws_client)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink = new ApolloLink((operation, forward: any) => {
  operation.setContext(({ headers = {} as any, localToken = localStorage.getItem('token') }) => {
    if (localToken) {
      headers['x-token'] = localToken
    }
    return {
      headers
    }
  })

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, statusCode, locations, path }) => {
      console.log('message: ', message)
      // console.log('statusCode: ', statusCode);
      if (statusCode === 401) {
        signOut(client)
      }
    })
  }

  if (networkError) {
    console.log('Network error: ', networkError)

    if ((networkError as any).statusCode === 401) {
      signOut(client)
    }
  }
})

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    session: {
      me: null,
      __typename: 'User'
    },
    loading: false
  },
  resolvers: {
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
  },
  typeDefs: `
    extend type Query {
      loading: Bool
      getSession: Session!
    }
    Session {
      me: User
    }
    Department {
      id: ID!
      name: String
    }
    User {
      id: ID!
      username: String!
      email: String!
      role: [String]
      departments: [Department]
      firstname: String
      lastname: String
      photo: String
      phoneNumber: String
      createdAt: String
    }
  `
})

const link = ApolloLink.from([stateLink, authLink, errorLink, terminatingLink])

const client = new ApolloClient({
  link,
  cache
})

export { client as default, client, stateLink }
// registerServiceWorker();
