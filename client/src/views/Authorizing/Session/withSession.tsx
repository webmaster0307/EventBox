import React from 'react'
import { Query } from 'react-apollo'
import { session } from '@gqlQueries'
import Page404 from '../../../Page/404'
import Loading from '../../../Page/Loading'

const withSession = (Component: React.ComponentType<any>) => (props: any) => (
  <Query query={session.GET_ME}>
    {({ data, error, loading, refetch }) => {
      if (error) {
        return <Page404 />
      }
      // console.log('error: ' ,error);
      if (loading) {
        return <Loading />
      }
      return <Component {...props} session={data} refetch={refetch} />
    }}
  </Query>
)

export interface withSessionProps {
  session: {
    me: {
      id: string
      email: string
      role: string[]
      username: string
      readonly __typename: 'User'
    }
  }
  refetch: () => void
}

export default withSession
