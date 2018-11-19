import React from 'react'
import { client } from '../../../'
import * as routes from '../../../constants/routes'
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom'
import { Card, Form, Spin, Button, Input, Icon, message } from 'antd'

const FormItem = Form.Item

const SignIn = ({refetch}) => (
  <div className='login-card__wrapper'>
    <Card 
      title='Sign In'
    >
      <SignInFormWrapped refetch={refetch} />
    </Card>
  </div>
)

export default SignIn

const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`;

class SignInForm extends React.Component{

  state = {
    loading: false
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
            result = await client.mutate({mutation: SIGN_IN, variables: { username, password}})
          } catch (error) {
            return message.error('Failed to login')
          }
          const { token } = result.data.signIn
          localStorage.setItem('token', token);
          await this.props.refetch();
          this.props.history.push(routes.HOME);
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
            })(
              <Input
                prefix={<Icon type='user' />}
                placeholder='Username or Email'
              />
            )}
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
            })(
              <Input
                prefix={<Icon type='lock' />}
                type='password'
                placeholder='Password'
              />
            )}
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