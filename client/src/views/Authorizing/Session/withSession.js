import React from 'react'
import { Query } from 'react-apollo'
import { GET_ME } from './queries'
import { Row, Spin } from 'antd'


const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, error, loading, refetch }) => {
      if(error){
        return(<div>Error</div>)
      }
      // console.log('error: ' ,error);
      if(loading){
        return(
          <Row type='flex' align='middle' justify='center' style={{height: '100vh'}} >
            <Spin spinning />
          </Row>
        )
      }
      return (
        <Component {...props} session={data} refetch={refetch} />
      )
    }}
  </Query>
)

export default withSession
