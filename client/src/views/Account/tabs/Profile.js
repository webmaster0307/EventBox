import React, { Component } from 'react'
import { Row, Col, Form, Divider, Input, Button } from 'antd'
import { AvatarPicker, ReadonlyFields } from './components'
import { Query } from 'react-apollo'
import { session } from '@gqlQueries'

// const roleColor = (role) => {
//   switch (role) {
//     case 'admin': {
//       return 'red'
//     }
//     case 'reviewer': {
//       return 'purple'
//     }
//     default: {
//       return 'blue'
//     }
//   }
// }

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 10 },
    lg: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
    md: { span: 14 },
    lg: { span: 18 }
  }
}

const LeftWrapper = () => (
  <Query query={session.GET_LOCAL_SESSION}>
    {({ data }) => (
      <>
        <AvatarPicker avatar={data.me && data.me.photo} />
        <Divider />
        <ReadonlyFields data={data.me} />
        <Divider />{' '}
      </>
    )}
  </Query>
)

class Profile extends Component {
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={12} lg={9}>
            <LeftWrapper />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              style={{
                borderRadius: 10,
                background: 'rgba(214, 229, 255, 0.4)',
                padding: 20
              }}
            >
              <Form>
                <Form.Item {...formItemLayout} label='First name' hasFeedback>
                  {getFieldDecorator('firstname', {
                    rules: [{ required: true, message: 'Firstname is required!' }]
                  })(<Input id='firstname' placeholder='Your first name' />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label='Last name' hasFeedback>
                  {getFieldDecorator('lastname', {
                    rules: []
                  })(<Input id='lastname' placeholder='Your last name' />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label='Contact' hasFeedback>
                  {getFieldDecorator('phoneNumber', {
                    rules: [
                      { required: true, message: 'Contact is required!' },
                      { pattern: /\d{8,}/gi, message: 'Please input valid phone number' }
                    ]
                  })(<Input id='phoneNumber' placeholder='Your phone number' />)}
                </Form.Item>

                <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button htmlType='submit' type='primary'>
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <Divider />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(Profile)
