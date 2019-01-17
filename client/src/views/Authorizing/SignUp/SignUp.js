import React from 'react'
import { client } from '@client'
import { withRouter } from 'react-router-dom'
import { Card, Form, Input, Icon, Button, message, Skeleton } from 'antd'
import gql from 'graphql-tag'
import { inject, observer } from 'mobx-react'
import { translate } from 'react-i18next'

const FormItem = Form.Item

const SignUp = ({refetch}) => (
  <SignUpFormWrapped refetch={refetch} />
)

export default SignUp

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`
@inject('stores')
@observer
class SignUpForm extends React.Component{

  state = {
    loading: false
  }

  _handleSignUp = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const { username, email, password } = values
        this.setState({loading: true}, async () => {
          let result
          try {
            result = await client.mutate({mutation: SIGN_UP, variables: { username, email, password }})
          } catch ({graphQLErrors}) {
            const msg = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
            return message.error(msg || 'Failed to sign up')
          }
          const { token } = result.data.signUp
          localStorage.setItem('token', token)
          await this.props.refetch()
          // this.props.history.push(routes.HOME)
          message.success('Sign up successfully!')
          this.props.stores.landing.ocSignUpModal('c')
        })
      }
    })
  }

  validateToConfirm = (rule, value, callback) => {
    this.props.form.validateFields(['confirm_password'], { force: true })
    callback()
  }

  validateConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    const password = getFieldValue('password')
    if(password !== value){
      callback('Password mismatch')
    }
    callback()
  }

  formFields = () => {
    // const { i18n } = this.props
    return [
      {
        name: 'username',
        title: 'usn',
        customRender: <Input prefix={<Icon type='user' />} placeholder='Username' />,
        rules: [
          {
            type: 'string',
            required: true,
            whitespace: true,
            message: 'Not correct format'
          }
        ]
      },
      {
        name: 'email',
        title: 'Email',
        customRender: <Input prefix={<Icon type='inbox' />} placeholder='Email' />,
        rules: [
          {
            type: 'email',
            required: true,
            whitespace: true,
            message: 'Not correct email format'
          }
        ]
      },
      {
        name: 'password',
        title: 'pwd',
        customRender: <Input prefix={<Icon type='lock' />} type='password' placeholder='Password' />,
        rules: [
          {
            type: 'string',
            required: true,
            whitespace: true,
            message: 'Not correct format'
          },
          {
            validator: this.validateToConfirm
          }
        ]
      },
      {
        name: 'confirm_password',
        title: 'cf-pwd',
        customRender: <Input prefix={<Icon type='lock' />} type='password' placeholder='Confirm Password' />,
        rules: [
          {
            type: 'string',
            required: true,
            whitespace: true,
            message: 'Not correct format'
          },
          {
            validator: this.validateConfirmPassword
          }
        ]
      }
    ]
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    const { i18n } = this.props
    return (
      <div className='sign-up-card__wrapper' >
        <Card
          title={i18n.t('signup')}
          headStyle={{textAlign: 'center'}}
        >
          <Skeleton loading={loading} avatar>
            <Form onSubmit={this._handleSignUp} hideRequiredMark >
              {this.formFields().map(field => {
                const { name, title, rules, customRender } = field
                return(
                  <FormItem
                    key={name}
                    label={i18n.t(title)}
                    colon={false}
                  >
                    {getFieldDecorator(name, {
                      rules
                    })(customRender)}
                  </FormItem>
                )
              })}
              <FormItem>
                <Button
                  type='primary'
                  block
                  htmlType='submit'
                >
                  <Icon type='user-add' />
                  {i18n.t('sign-up')}
                </Button>
              </FormItem>
            </Form>
          </Skeleton>
        </Card>
      </div>
    )
  }
}

const SignUpFormWrapped = translate('translations')(Form.create()(withRouter(SignUpForm)))
