import React, { Component } from 'react'
import { Form, Input, Button, Row, Select, message } from 'antd'
import { RULE_NOT_EMPTY, ITEM_LAYOUT } from './constants'
import { FormComponentProps } from 'antd/lib/form'
import { client } from '@client';
import { department, departmentUser } from '@gqlQueries';
import { inject } from 'mobx-react';

const { Item } = Form
const { Option } = Select

class FormAddUser extends Component<FormComponentProps & {onAddSuccess: Function}>{

  handleSubmit = (e : React.FormEvent) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (err, values) => {
      if(!err){
        const { email, role } = values
        let result
        try {
          result = await client.mutate({
            mutation: departmentUser.INVITE_TO_DEPARTMENT,
            variables: { email, role }
          })
        } catch ({graphQLErrors}) {
          const msg = graphQLErrors && graphQLErrors.map((item : any) => item.message).join(', ')
          return message.error(msg)
        }
        message.success('Thêm thành viên mới thành công!')
        this.props.onAddSuccess(result.data.createDepartment)
      }
    })
  }

  formFields = () => {
    return([
      {
        name: 'email',
        title: 'Email thành viên',
        customRender: <Input placeholder='vinhnguyen@vanlanguni.edu.vn' />,
        rules: [RULE_NOT_EMPTY]
      },
      {
        name: 'role',
        title: 'Vai trò',
        customRender: 
        <Select defaultValue='reviewer' >
          <Option value='member' disabled >Thành viên</Option>
          <Option value='reviewer' >Xét duyệt sự kiện</Option>
        </Select>,
        rules: [RULE_NOT_EMPTY]
      }
    ])
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark className='form-add-department__wrapper' >
        {this.formFields().map(field => {
          const { name, title, rules, customRender } = field
          return(
            <Item
              key={name}
              label={title}
              colon={false}
              {...ITEM_LAYOUT}
            >
              {getFieldDecorator(name, {
                rules
              })(customRender)}
            </Item>
          )
        })}
        <Item
          key={name}
          colon={false}
          {...ITEM_LAYOUT}
        >
          <Row type='flex' justify='center' >
            <Button htmlType='submit' type='primary' >Xác nhận</Button>
          </Row>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(FormAddUser)