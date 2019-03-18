import React, { Component } from 'react'
import { Form, Input, Button, Row, Select, message } from 'antd'
import { RULE_NOT_EMPTY, ITEM_LAYOUT } from './constants'
import { FormComponentProps } from 'antd/lib/form'
import { client } from '@client'
import { departmentUser } from '@gqlQueries'

const { Item } = Form
const { Option } = Select

class FormAddUser extends Component<
  FormComponentProps & { departmentId: string; onClose: () => void }
> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { form, departmentId, onClose } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        const { email, role } = values
        let result
        try {
          result = await client.mutate({
            mutation: departmentUser.INVITE_TO_DEPARTMENT,
            variables: { departmentId, email, role },
            update: (cache, { data: { inviteMember } }) => {
              if (!inviteMember) {
                // return alert('Failed to invite')
              }
              try {
                const data = cache.readQuery({
                  query: departmentUser.GET_DEPARTMENT_USERS,
                  variables: { departmentId }
                })
                cache.writeQuery({
                  query: departmentUser.GET_DEPARTMENT_USERS,
                  variables: { departmentId },
                  data: {
                    ...data,
                    departmentUsers: [...(data as any).departmentUsers, inviteMember]
                  }
                })
                onClose()
              } catch (error) {
                // console.log('error: ', error)
                onClose()
              }
            }
          })
        } catch ({ graphQLErrors }) {
          const msg = graphQLErrors && graphQLErrors.map((item: any) => item.message).join(', ')
          return message.error(msg)
        }
        const { user } = result.data.inviteMember
        message.success('Thêm thành viên mới thành công!')
      }
    })
  }

  formFields = () => {
    return [
      {
        name: 'email',
        title: 'Email thành viên',
        customRender: <Input placeholder='vinhnguyen@vanlanguni.edu.vn' />,
        rules: [RULE_NOT_EMPTY]
      },
      {
        name: 'role',
        title: 'Vai trò',
        customRender: (
          <Select>
            <Option value='member' disabled>
              Thành viên
            </Option>
            <Option value='reviewer'>Xét duyệt sự kiện</Option>
          </Select>
        ),
        initialValue: 'reviewer',
        rules: [RULE_NOT_EMPTY]
      }
    ]
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark className='form-add-department__wrapper'>
        {this.formFields().map((field) => {
          const { name, title, rules, initialValue, customRender } = field
          return (
            <Item key={name} label={title} colon={false} {...ITEM_LAYOUT}>
              {getFieldDecorator(name, {
                rules,
                initialValue
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

export default Form.create()(FormAddUser)
