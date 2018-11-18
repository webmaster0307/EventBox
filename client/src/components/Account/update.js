import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom'
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';

const UPDATE_ACCOUNT = gql`
  mutation($username: String!){
    updateUser(username: $username){
      id,
      username,
      email,
      role
    }
  }
`

class UpdateAccountForm extends Component{

  state = {
    username: ''
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmit = (event, updateUser) => {
    event.preventDefault();

    updateUser().then(async ({ data }) => {
      this.setState({ username: '' });
      // console.log('data: ' ,data);
      this.props.history.push(routes.LANDING);
    });
  };

  render() {
    const { username } = this.state;

    const isInvalid = username === '';

    return (
      <Mutation mutation={UPDATE_ACCOUNT} variables={{ username }}>
        {(updateUser, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, updateUser)}>
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
            />
            <button disabled={isInvalid || loading} type="submit">
              Update
            </button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(UpdateAccountForm)