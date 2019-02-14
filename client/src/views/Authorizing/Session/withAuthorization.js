import React from 'react'
import { Query } from 'react-apollo'
import * as routes from '@routes'
import { session } from '@gqlQueries'
import { Redirect } from 'react-router-dom'

const withAuthorization = (conditionFn) => (Component) => (props) => (
  <Query query={session.GET_LOCAL_SESSION}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null
      }

      return conditionFn(data) ? (
        <Component {...props} {...data} />
      ) : (
        <Redirect to={routes.SIGN_IN} />
      )
    }}
  </Query>
)

export default withAuthorization
