import React, { Component } from 'react'
import { Row, Col, Form, Button, Input } from 'antd'

class ChangePassword extends Component {
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
        md: { span: 10 },
        lg: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 14 },
        lg: { span: 15 }
      }
    }
    return (
      <div>
        <Row>
          <Col md={4} lg={6} />
          <Col xs= {24} sm={24} md={16} lg={12}>
            <div
              style={{
                borderRadius: 10,
                background: 'rgba(214, 229, 255, 0.4)',
                padding: 20
              }}
            >
              <Form>
                <Form.Item {...formItemLayout} label='Old Password' hasFeedback>
                  {getFieldDecorator('oldPassword', {
                    rules: [
                      { required: true, message: 'Old password is required!' }
                    ]
                  })(<Input id='oldPassword' placeholder='Input old password' />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label='New Password' hasFeedback>
                  {getFieldDecorator('newPassword', {
                    rules: [
                      { required: true, message: 'New password is required!' }
                    ]
                  })(<Input id='newPassword' placeholder='Input new password' />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label='Confirm Password' hasFeedback>
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      { required: true, message: 'Confirm password is required!' }
                    ]
                  })(<Input id='confirmPassword' placeholder='Re-enter new password' />)}
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                  <Button htmlType='submit' type='primary'>Update</Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(ChangePassword)
