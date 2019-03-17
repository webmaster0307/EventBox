import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
const { createUploadLink } = require('apollo-upload-client')

import { signOut } from '@components'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

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

const defaultDataCache = {
  session: {
    me: null,
    __typename: 'User'
  },
  loading: false
}
cache.writeData({
  data: defaultDataCache
})

const link = ApolloLink.from([authLink, errorLink, terminatingLink])

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs
})

client.onResetStore(async () => await cache.writeData({ data: defaultDataCache }))

export { client as default, client }
// registerServiceWorker();
