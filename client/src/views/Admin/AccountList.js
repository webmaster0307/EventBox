import React, { Component } from 'react'
import { Table, Button, Icon, Tag } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class AccountList extends Component {
  componentDidMount = async () => {
    this.props.stores.admin.getAccountList()
  }

  render () {
    const { accountList } = this.props.stores.admin
    const columns = [{
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      render: (usr) => (
        <span>{usr.length > 20 ? `${usr.substring(0, 20)}...` : usr}</span>
      )
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email) => (
        <span>{email.length > 20 ? `${email.substring(0, 20)}...` : email}</span>
      )
    }, {
      title: 'Role',
      dataIndex: '__typename',
      key: '__typename',
      width: 200,
      render: (r) => (
        <span>
          {/* {role.map(r => <Tag color='blue' key={r}>{r}</Tag>)} */}
          <Tag color='blue' key={r}>{r}</Tag>
        </span>
      )
    }, {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span key={text}>
          <Button
            value={record.id}
            onClick={(e) => this.props.stores.admin.deleteUser(e.target.value)}
          >
            <Icon type='delete' />Delete
          </Button>
        </span>
      )
    }]
    return (
      <Table columns={columns} dataSource={accountList} />
    )
  }
}

export default AccountList