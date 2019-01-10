import React, { Component } from 'react'
import { List, Avatar, Divider, Button } from 'antd'
import { withModal } from '@components'
import FormAddUser from './FormAddUser'

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]

@withModal
class DepartmentUserList extends Component{

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
    return (
      <div>
        <Button type='primary' onClick={this.handleAddMember} >Thêm thành viên</Button>
        <Divider />
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                title={<a href='https://ant.design'>{item.title}</a>}
                description='Ant Design, a design language for background applications, is refined by Ant UED Team'
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default DepartmentUserList