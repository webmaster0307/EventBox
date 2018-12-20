import React from 'react'
import { client } from '@client'
import * as routes from '@routes'
import gql from 'graphql-tag'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { Card, Form, Spin, Button, Input, Icon, message } from 'antd'
import queryString from 'query-string'
import { Query } from 'react-apollo'
import { GET_SESSION } from '../Session/localQueries'

const FormItem = Form.Item

const SignIn = ({refetch}) => (
  <Query query={GET_SESSION} >
    {({data}) => {
      if(data && data.me){
        return(
          <Redirect to={routes.HOME} />
        )
      }
      else{
        return(
          <div className='login-card__wrapper'>
            <Card 
              title='Sign In'
            >
              <SignInFormWrapped refetch={refetch} />
            </Card>
          </div>
        )
      }
    }}
  </Query>
)

export default SignIn

const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`

class SignInForm extends React.Component{

  state = {
    loading: false
  }

  componentDidMount = () => {
    const { search } = this.props.location
    if(search){
      const { code } = queryString.parse(search)
      var formData = new FormData()
      formData.append('code', code)
      fetch('http://cntttest.vanlanguni.edu.vn:18080/Cap21T4/LoginManagement/Account/GetInfo', {
        method: 'POST',
        body: formData
      })
        .then( res => res.json())
        .then( res => {
          console.log('res: ' ,res)
        })
    }
  }
  

  _handleSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const { username, password } = values
        this.setState({loading: true}, async () => {
          let result
          try {
            result = await client.mutate({mutation: SIGN_IN, variables: { username, password }})
          } catch ({graphQLErrors}) {
            const msg = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
            this.setState({loading: false})
            return message.error(msg)
          }
          const { token } = result.data.signIn
          localStorage.setItem('token', token)
          await this.props.refetch()
          this.props.history.push(routes.HOME)
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state

    return (
      <Spin spinning={loading} >
        <Form onSubmit={this._handleSubmit} >
          <FormItem key='username'>
            {getFieldDecorator('username', {
              rules: [
                {
                  type: 'string',
                  required: true,
                  whitespace: true,
                  message: 'Not correct format'
                }
              ]
            })(<Input
              prefix={<Icon type='user' />}
              placeholder='Username or Email'
            />)}
          </FormItem>
          <FormItem key='password'>
            {getFieldDecorator('password', {
              rules: [
                {
                  type: 'string',
                  required: true,
                  message: 'Not correct'
                }
              ]
            })(<Input
              prefix={<Icon type='lock' />}
              type='password'
              placeholder='Password'
            />)}
          </FormItem>
          <FormItem>
            <div>
              <li><Link to='/' >Home</Link></li>
            </div>
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              block
              htmlType='submit'
            >
              <Icon type='login' />
              Login
            </Button>
          </FormItem>
        </Form>
      </Spin>
    )
  }
}

const SignInFormWrapped = Form.create()(withRouter(SignInForm))