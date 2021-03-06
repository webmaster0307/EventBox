import React from 'react'
import { ApolloConsumer } from 'react-apollo'

import * as routes from '@routes'
import history from '../../constants/history'

const SignOutButton = () => (
  <ApolloConsumer>
    {(client) => (
      <button type='button' onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
)

const signOut = (client) => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push(routes.HOME)
}

export { signOut }

export default SignOutButton
