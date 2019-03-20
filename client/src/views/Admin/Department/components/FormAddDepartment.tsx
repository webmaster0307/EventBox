import React, { Component } from 'react'
import { Form, Input, Button, Row, message } from 'antd'
import { RULE_NOT_EMPTY, ITEM_LAYOUT } from './constants'
import { FormComponentProps } from 'antd/lib/form'
import { client } from '@client'
import { department } from '@gqlQueries'

const { Item } = Form

class FormAddDepartment extends Component<FormComponentProps & { onAddSuccess: Function }> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        const { name, description } = values
        let result
        try {
          result = await client.mutate({
            mutation: department.CREATE_DEPARTMENT,
            variables: { name, description }
          })
        } catch ({ graphQLErrors }) {
          const msg = graphQLErrors && graphQLErrors.map((item: any) => item.message).join(', ')
          return message.error(msg)
        }
        message.success('Thêm khoa mới thành công!')
        this.props.onAddSuccess(result.data.createDepartment)
      }
    })
  }

  formFields = () => {
    return [
      {
        name: 'name',
        title: 'Tên khoa',
        customRender: <Input placeholder='Tên khoa' />,
        rules: [RULE_NOT_EMPTY]
      },
      {
        name: 'description',
        title: 'Mô tả về khoa',
        customRender: <Input.TextArea placeholder='Mô tả' autosize={{ minRows: 3, maxRows: 6 }} />,
        rules: [RULE_NOT_EMPTY]
      }
    ]
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark className='form-add-department__wrapper'>
        {this.formFields().map((field) => {
          const { name, title, rules, customRender } = field
          return (
            <Item key={name} label={title} colon={false} {...ITEM_LAYOUT}>
              {getFieldDecorator(name, {
                rules
              })(customRender)}
            </Item>
          )
        })}
        <Item key={name} colon={false} {...ITEM_LAYOUT}>
          <Row type='flex' justify='center'>
            <Button htmlType='submit' type='primary'>
              Xác nhận
            </Button>
          </Row>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(FormAddDepartment)
