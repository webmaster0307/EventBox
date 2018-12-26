
import React, { Component } from 'react'
import { Input, Form, Row, Col, Divider } from 'antd'
import { formRuleNotEmpty, formItemLayout } from './constants'

const FormItem = Form.Item

class OrganizationArea extends Component{

  formFields = () => [
    {
      name: 'organizationName',
      title: 'Organization Name',
      customRender: <Input placeholder='Organization' />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'organizationLogo',
      title: 'Organization Logo',
      customRender: <Input placeholder='Organization logo' />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'organizationDescription',
      title: 'About organization',
      customRender: <Input.TextArea placeholder='About organization' />,
      rules: [formRuleNotEmpty]
    }
  ]

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
        {this.formFields().map(field => {
          const { name, title, rules, customRender } = field
          return(
            <FormItem
              key={name}
              label={title}
              colon={false}
              {...formItemLayout}
            >
              {getFieldDecorator(name, {
                rules
              })(customRender)}
            </FormItem>
          )
        })}
      </>
    )
  }
}

const OriganizationWrapper = (props) => (
  <Row>
    <Col span={6}>
      <strong style={{fontWeight: 'bold', fontSize: 16}} >Organization</strong>
    </Col>
    <Col span={18} >
      <OrganizationArea {...props} />
    </Col>
    <Divider />
  </Row>
)

export default OriganizationWrapper