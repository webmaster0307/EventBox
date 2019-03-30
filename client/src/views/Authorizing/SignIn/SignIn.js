import React from 'react'
import { client } from '@client'
import * as routes from '@routes'
import { withRouter, Redirect } from 'react-router-dom'
import { Card, Form, Button, Input, Icon, Skeleton, message, Row, Col } from 'antd'
import queryString from 'query-string'
import { observer, inject } from 'mobx-react'
import { user as userMutations } from '@gqlQueries'
import { withTranslation } from 'react-i18next'

const FormItem = Form.Item

const SignIn = ({ session, refetch }) => {
  if (session && session.me) {
    return <Redirect to={routes.HOME} />
  } else {
    return <SignInFormWrapped refetch={refetch} />
  }
}
export default SignIn

@inject('stores')
@observer
class SignInForm extends React.Component {
  state = {
    loading: false
  }

  componentDidMount = () => {
    const { search } = this.props.location
    if (search) {
      const { code } = queryString.parse(search)
      var formData = new FormData()
      formData.append('code', code)
      fetch('http://cntttest.vanlanguni.edu.vn:18080/Cap21T4/LoginManagement/Account/GetInfo', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('res: ', res)
        })
    }
  }

  loginFromVL = () => {
    const url = `${process.env.REACT_APP_HOST}/api/login/oauthVL`
    window.open(url, '_self')
  }

  _handleSubmit = (event) => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        this.setState({ loading: true }, async () => {
          let result
          try {
            result = await client.mutate({
              mutation: userMutations.SIGN_IN,
              variables: { username, password }
            })
          } catch ({ graphQLErrors }) {
            const msg = graphQLErrors && graphQLErrors.map((item) => item.message).join(', ')
            this.setState({ loading: false })
            return message.error(msg)
          }
          const { token } = result.data.signIn
          localStorage.setItem('token', token)
          await this.props.refetch()
          // this.props.history.push(routes.HOME)
          this.props.stores.landing.ocSignInModal('c')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    const { i18n } = this.props
    return (
      <div className='login-card__wrapper'>
        <Card headStyle={{ textAlign: 'center' }} title={i18n.t('signin')}>
          <Skeleton loading={loading} avatar active={loading}>
            <Form onSubmit={this._handleSubmit} hideRequiredMark>
              <FormItem label={i18n.t('usn')} colon={false} key='username'>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      type: 'string',
                      required: true,
                      whitespace: true,
                      message: 'Not correct format'
                    }
                  ]
                })(<Input prefix={<Icon type='user' />} placeholder={i18n.t('usn-ph')} />)}
              </FormItem>
              <FormItem label={i18n.t('pwd')} colon={false} key='password'>
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
                    placeholder={i18n.t('pwd-ph')}
                  />
                )}
              </FormItem>
              <FormItem>
                <Row>
                  <Col span={11}>
                    <Button type='primary' block htmlType='submit'>
                      <Icon type='login' />
                      {i18n.t('Login')}
                    </Button>
                  </Col>
                  <Col span={11} offset={2}>
                    <Button type='primary' block onClick={this.loginFromVL}>
                      {i18n.t('Using VanLang Account')}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Skeleton>
        </Card>
      </div>
    )
  }
}

const SignInFormWrapped = withTranslation()(Form.create()(withRouter(SignInForm)))

export { SignInFormWrapped }
