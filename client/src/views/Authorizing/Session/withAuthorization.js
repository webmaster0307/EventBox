import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import * as routes from '@routes'
import { GET_SESSION } from '../../Authorizing/Session/localQueries'

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_SESSION}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null
      }

      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.SIGN_IN} />
      )
    }}
  </Query>
)

export default withAuthorization
