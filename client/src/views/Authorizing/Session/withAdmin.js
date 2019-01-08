import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import * as routes from '@routes'
import { session } from '@gqlQueries'

const withAdmin = Component => props => (
  <Query query={session.GET_LOCAL_SESSION}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null
      }
      const role = data.me && data.me.role
      if(role && role.includes('admin')){
        return <Component {...props} />
      }
      else{
        if(props.match.path.startsWith('/dashboard')){
          return <Redirect to={routes.HOME} />
        }
        return <Redirect to={routes.UNAUTHORIZED} />
      }
    }}
  </Query>
)

export default withAdmin
