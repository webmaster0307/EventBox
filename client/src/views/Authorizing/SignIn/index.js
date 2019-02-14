import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import { SignUpLink } from '../SignUp'
import * as routes from '@routes'
import ErrorMessage from '../../ErrorPage'

const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`

const SignInPage = ({ history, refetch }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  username: '',
  password: ''
}

class SignInForm extends Component {
  state = { ...INITIAL_STATE }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE })

      localStorage.setItem('token', data.signIn.token)
      // console.log('data: ',data)
      // console.log('props: ', this.props)
      await this.props.refetch()

      this.props.history.push(routes.HOME)
    })

    event.preventDefault()
  }

  render() {
    const { username, password } = this.state

    const isInvalid = password === '' || username === ''

    return (
      <Mutation mutation={SIGN_IN} variables={{ username, password }}>
        {(signIn, { data, loading, error }) => (
          <form onSubmit={(event) => this.onSubmit(event, signIn)}>
            <input
              name='username'
              value={username}
              onChange={this.onChange}
              type='text'
              placeholder='Email or Username'
            />
            <input
              name='password'
              value={password}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
            />
            <button disabled={isInvalid || loading} type='submit'>
              Sign In
            </button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    )
  }
}

export default withRouter(SignInPage)
