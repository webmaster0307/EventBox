import React, { Component } from 'react'
import { List, Avatar, Divider, Button, message, Skeleton } from 'antd'
import { withModal } from '@components'
import FormAddUser from './FormAddUser'
import { client } from '@client'
import { department } from '@gqlQueries'
import { withRouter } from 'react-router'

@withModal
@withRouter
class DepartmentUserList extends Component{

  state = {
    loading: true,
    users: []
  }

  componentDidMount = async () => {
    let result
    const { departmentId } = this.props.match.params
    
    try {
      result = await client.query({
        query: department.GET_USERS_BY_DEPARTMENT,
        variables: { departmentId }
      })
    } catch (error) {
      return message.error('Failed to get users from department')
    }
    this.setState({
      users: result.data.userOfDepartments,
      loading: false
    })
    // console.log('result: ',result.data)
  }
  

  handleAddMember = () => {
    const { modal } = this.props
    modal.show({
      title: 'Thêm mới thành',
      body: <FormAddUser onAddSuccess={this.handleAddSuccess} />
    })
  }

  handleAddSuccess = () => {
    
  }

  render() {
    const { users, loading } = this.state

    return (
      <div>
        <Button type='primary' onClick={this.handleAddMember} >Thêm thành viên</Button>
        <Divider />
        <List
          itemLayout='horizontal'
          dataSource={users}
          renderItem={item => (
            <List.Item
              key={item.id}
            >
              <Skeleton
                loading={loading}
                active
                avatar
              >
                <List.Item.Meta
                  avatar={<Avatar size={36} />}
                  title={<span>{item.username} | {item.email}</span>}
                  description={`UserID: ${item.id}`}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default DepartmentUserList