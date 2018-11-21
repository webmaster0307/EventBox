import React from 'react'
import { Query } from 'react-apollo'
import { GET_ME } from './queries'
import { Loading } from '@components'


const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, error, loading, refetch }) => {
      if(error){
        return(<div>Error</div>)
      }
      // console.log('error: ' ,error);
      if(loading){
        return <Loading />
      }
      return (
        <Component {...props} session={data} refetch={refetch} />
      )
    }}
  </Query>
)

export default withSession
