import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';
import Loading from '../Loading'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { client } from '../../'
import { Button, Skeleton } from 'antd'
import './styles.scss'

const Navigation = ({ session }) => (
  <div>
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
    <APIStatus />
  </div>
);

const NavigationAuth = ({ session }) => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
    </li>
    {session &&
      session.me &&
      session.me.role === 'ADMIN' && (
        <li>
          <Link to={routes.ADMIN}>Admin</Link>
        </li>
      )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

class APIStatus extends React.Component{

  state = {
    loading: false,
    status: ''
  }

  componentDidMount = () => {
    // console.log('route: ' ,routes.API_STATUS)
    this.setState({ loading: true}, () => {
      fetch(routes.API_STATUS)
      .then( res => res.json())
      .then( data => {
        this.setState({
          loading: false,
          status: data.status
        })
      })
      .catch(err => console.log('err: ',err))
    })
  }

  render() {
    const { status, loading } = this.state
    if(loading){
      return(<Loading />)
    }
    const style = {
      color: `${status === 'ok' ? 'green' : 'red'}`
    }

    return (
      <div>
        <span style={style}>Express API status: {status}</span>
        <div className='loading' >
          <LocalLoading />
        </div>
      </div>
    )
  }
}

export default Navigation;

const getLoading = gql`
  query {
    loading @client
  }
`
const toggleLoad = gql`
  mutation {
    toggleLoading @client
  }
`
class LocalLoading extends Component{

  toggleLoading = () => {
    client.mutate({mutation: toggleLoad})
  }

  render() {

    return(
      <div>
        {/* <Mutation
          mutation={toggleLoad}
          variables={{loading: true}}
        >
          {(toggleLoading) => (
            <Button onClick={() => handleToggleLoading(toggleLoading)} >Loading</Button>
          )}
        </Mutation> */}
        
        <Query
          query={getLoading}
        >
        {({data}) => (
          <div>
            <Button type='primary' onClick={this.toggleLoading} >Toggle loading</Button>
            <Skeleton active={data.loading} />
          </div>
        )}
        </Query>
      </div>
    )
  }
}