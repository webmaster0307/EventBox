import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { withTranslation } from 'react-i18next'
import { RULE_NOT_EMPTY } from '@formRules'

const { Item: FormItem } = Form
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

class FormUserInfo extends Component {
  formFields = () => {
    const { t: trans } = this.props

    return [
      {
        name: 'firstname',
        label: trans('First name'),
        customRender: <Input placeholder={trans('Your first name')} />,
        rules: [RULE_NOT_EMPTY]
      },
      {
        name: 'lastnanme',
        label: trans('Last name'),
        customRender: <Input placeholder={trans('Your last name')} />,
        rules: [RULE_NOT_EMPTY]
      },
      {
        name: 'phoneNumber',
        label: trans('Contact'),
        customRender: <Input placeholder={trans('Your phone number')} />,
        rules: [RULE_NOT_EMPTY]
      }
    ]
  }

  render() {
    const {
      formFields,
      props: {
        form: { getFieldDecorator },
        t: trans
      }
    } = this
    return (
      <Form hideRequiredMark>
        {formFields().map((item) => {
          const { name, label, customRender, rules, ...rest } = item
          return (
            <FormItem key={name} label={label} {...formItemLayout} hasFeedback>
              {getFieldDecorator(name, {
                rules,
                rest
              })(customRender)}
            </FormItem>
          )
        })}
        <FormItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button htmlType='submit' type='primary'>
            {trans('Update Profile')}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(withTranslation('translations')(FormUserInfo))
