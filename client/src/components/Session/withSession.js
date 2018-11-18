import React from 'react';
import { Query } from 'react-apollo';
import { GET_ME } from './queries';
import Loading from '../Loading';


const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, loading, refetch }) => {
      if(loading){
        return <Loading />
      }
      return (
        <Component {...props} session={data} refetch={refetch} />
      )
    }}
  </Query>
);

export default withSession;
