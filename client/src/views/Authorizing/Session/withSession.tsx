import React from 'react'
import { Query } from 'react-apollo'
import { session } from '@gqlQueries'
import Page404 from '../../../Page/404'
// import Loading from '../../../Page/Loading'
import { Skeleton } from 'antd'

const withSession = (Component: React.ComponentType<any>) => (props: any) => (
  <Query query={session.GET_ME}>
    {({ data, error, loading, refetch }) => {
      if (error) {
        return <Page404 />
      }
      // console.log('error: ' ,error);
      if (loading) {
        return (
          <div style={{ padding: 50 }}>
            <Skeleton active title={{ width: '100%' }} />
          </div>
        )
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
  refetch: () => Promise<{}>
}

export default withSession
