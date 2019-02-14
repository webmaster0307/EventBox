import React, { Component } from 'react'
import { Row, Col, Form, Divider, Input, Tag, Select, Button, Icon, Upload, Avatar } from 'antd'
import { Query } from 'react-apollo'
import { session } from '@gqlQueries'

const Option = Select.Option

class Profile extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const fsFormLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
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

    return (
      <Query query={session.GET_LOCAL_SESSION}>
        {({ data }) => {
          const { username, email, role, department } = data.me
          return (
            <div>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={9}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      background: 'rgba(214, 229, 255, 0.4)',
                      padding: 10
                    }}
                  >
                    <p>Avatar</p>
                    <Avatar
                      size={144}
                      icon='user'
                      style={{
                        marginBottom: 10
                      }}
                    />
                    <Upload
                      showUploadList={false}
                      // action="//jsonplaceholder.typicode.com/posts/"
                      // beforeUpload={beforeUpload}
                      // onChange={this.handleChange}
                    >
                      <Button>
                        <Icon type='upload' /> Change avatar
                      </Button>
                    </Upload>
                  </div>
                  <Divider />
                  <div
                    style={{
                      borderRadius: 10,
                      background: 'rgba(214, 229, 255, 0.4)',
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      // alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Form>
                      {/* email */}
                      <Form.Item {...fsFormLayout} label='Email'>
                        <Input value={email} disabled />
                      </Form.Item>

                      {/* username */}
                      <Form.Item {...fsFormLayout} label='Username'>
                        <Input value={username} disabled />
                      </Form.Item>

                      {/* user role */}
                      <Form.Item {...fsFormLayout} label='Role'>
                        {role &&
                          role.map((r) => (
                            <Tag
                              color={r === 'admin' ? 'red' : r === 'user' ? 'blue' : 'purple'}
                              key={r}
                            >
                              {r}
                            </Tag>
                          ))}
                      </Form.Item>

                      {/* department */}
                      <Form.Item {...fsFormLayout} label='Department'>
                        {department &&
                          department.map((r) => (
                            <Tag color='green' key={r}>
                              {r}
                            </Tag>
                          ))}
                      </Form.Item>

                      {/* link to event list */}
                      <Form.Item {...fsFormLayout} label='Your events'>
                        <Button type='primary' ghost>
                          List
                          <Icon type='file-search' />
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  <Divider />
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
                      {/* eslint-disable */}
                      {/* <Form.Item {...formItemLayout} label='Email' hasFeedback>
                  {getFieldDecorator('email', {
                    rules: [
                      { required: true, message: 'Email is required!' },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/ +
                        /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
                        message: 'Wrong email format!'
                      }
                    ]
                  })(<Input id='email' placeholder='Email address' />)}
                </Form.Item> */}

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

                      <Form.Item {...formItemLayout} label='Secret Q/A'>
                        {getFieldDecorator('secret', {
                          rules: [{ required: true, message: 'Please input your answer' }]
                        })(
                          <div>
                            <Select placeholder='Please select a question'>
                              <Option value='1'>1 + 1 = ?</Option>
                              <Option value='2'>2 + 2 = ?</Option>
                              <Option value='3'>3 + 3 = ?</Option>
                            </Select>
                            <Input placeholder='Input your answer here' id='secret' />
                          </div>
                        )}
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
        }}
      </Query>
    )
  }
}

export default Form.create()(Profile)
