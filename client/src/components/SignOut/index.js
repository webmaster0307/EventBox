import React from 'react'
import { ApolloConsumer } from 'react-apollo'

// import * as routes from '@routes'
// import history from '../../constants/history'

import { stateLink } from '../../'

const SignOutButton = () => (
  <ApolloConsumer>
    {(client) => (
      <button type='button' onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
)

const signOut = async (client) => {
  localStorage.setItem('token', '')
  await client.resetStore(stateLink.writeDefaults())
  // if (history.location.pathname !== routes.HOME) {
  //   history.push(routes.HOME)
  // }
}

export { signOut }

export default SignOutButton
