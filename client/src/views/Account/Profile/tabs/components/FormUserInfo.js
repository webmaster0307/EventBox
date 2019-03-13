import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { withTranslation } from 'react-i18next'
import { RULE_NOT_EMPTY } from '@formRules'
import { Mutation } from 'react-apollo'
import { user } from '@gqlQueries'

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
  componentDidMount = () => {
    const {
      data: { firstname, lastname, phoneNumber },
      form: { setFieldsValue }
    } = this.props
    setFieldsValue({ firstname, lastname, phoneNumber })
  }

  formFields = () => {
    const { t: trans } = this.props

    return [
      {
        name: 'firstname',
        label: trans('First name'),
        customRender: <Input placeholder={trans('Your first name')} />,
        rules: [RULE_NOT_EMPTY, { min: 1, max: 50 }]
      },
      {
        name: 'lastname',
        label: trans('Last name'),
        customRender: <Input placeholder={trans('Your last name')} />,
        rules: [RULE_NOT_EMPTY, { min: 1, max: 50 }]
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
        form: { getFieldDecorator, getFieldsValue },
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
          {
            <Mutation
              mutation={user.USER_UPDATE_PROFILE}
              variables={{ ...getFieldsValue() }}
              onCompleted={({ updateProfie }) => {
                if (updateProfie) {
                  message.success(trans('Updated user profile successfully!'))
                } else {
                  message.success(trans('Updated user profile failed!'))
                }
              }}
            >
              {(updateProfie, { loading }) => (
                <Button
                  htmlType='submit'
                  type='primary'
                  loading={loading}
                  onClick={() => updateProfie()}
                >
                  {trans('Update Profile')}
                </Button>
              )}
            </Mutation>
          }
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(withTranslation('translations')(FormUserInfo))
