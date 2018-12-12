import 'dotenv/config'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'

import { Provider } from 'mobx-react'

import App from './App'
import { signOut } from '@components'
// import registerServiceWorker from './registerServiceWorker';
import gql from 'graphql-tag'

import { Event } from './store'

// import 'antd/dist/antd.css';
import './atnd.less'

const prodMode = process.env.NODE_ENV === 'production'

const httpLink = new HttpLink({
  uri: '/graphql'
})

const wsLink = new WebSocketLink({
  uri: `ws://${prodMode ? process.env.REACT_APP_GRAPHQL_SUBSCRIPTION : 'localhost:8000/graphql'}`,
  options: {
    reconnect: true
  }
})

const terminatingLink = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return (
    kind === 'OperationDefinition' && operation === 'subscription'
  )
},
wsLink,
httpLink,)

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {}, localToken = localStorage.getItem('token') }) => {
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

    if (networkError.statusCode === 401) {
      signOut(client)
    }
  }
})

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    session: {
      me: null
    },
    loading: false
  },
  resolvers: {
    Mutation: {
      toggleLoading: ( _, variables, { cache, getCacheKey }) => {
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
      setSession: ( _, { session }, { cache, getCacheKey }) => {
        // console.log('session: ' ,session);
        const data = {
          session : {
            me: {
              ...session.me,
              __typename: 'User'
            },
            __typename: 'Session'
          }
        }
        cache.writeData({ data })
        return null
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
    User {
      id: ID!
      username: String!
      email: String!
      role: String
    }
  `
})

const link = ApolloLink.from([stateLink, authLink, errorLink, terminatingLink])

export const client = new ApolloClient({
  link,
  cache
})

const stores = {
  event: new Event()
}

ReactDOM.render(<ApolloProvider client={client}>
  <Provider stores={stores} >
    <App />
  </Provider>
</ApolloProvider>,
document.getElementById('root'))

// registerServiceWorker();
