import React, { Component } from 'react'
import { Table, Button, Icon, Tag } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class AccountList extends Component {
  componentDidMount = async () => {
    this.props.stores.admin.accountStore.getAccountList()
  }

  render() {
    const { accountList } = this.props.stores.admin.accountStore

    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: 200,
        render: (usr) => <span>{usr.length > 20 ? `${usr.substring(0, 20)}...` : usr}</span>
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
        render: (email) => <span>{email.length > 20 ? `${email.substring(0, 20)}...` : email}</span>
      },
      {
        title: 'Full name',
        dataIndex: 'fullname',
        key: 'fullname',
        width: 200,
        render: (text, r) => (
          <span>
            {`${r.firstname} ${r.lastname}`.length > 20
              ? `${r.firstname} ${r.lastname}`.substring(0, 20) + '...'
              : `${r.firstname} ${r.lastname}`}
          </span>
        )
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: 200,
        render: (role) => (
          <span>
            {role.map((r) => (
              <Tag color={r === 'admin' ? 'red' : r === 'user' ? 'blue' : 'purple'} key={r}>
                {r}
              </Tag>
            ))}
          </span>
        )
      },
      {
        title: 'Is Activated',
        dataIndex: 'isActivated',
        key: 'isActivated',
        width: 200,
        render: (isActivated) => (
          <span>
            <Tag color={isActivated ? 'blue' : 'red'}>{isActivated ? 'Already' : 'Not yet'}</Tag>
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        width: 200,
        // fixed: 'right',
        render: (text, record) => (
          <span>
            <Button
              value={record.id}
              onClick={(e) => this.props.stores.admin.accountStore.deleteUser(e.target.value)}
            >
              <Icon type='delete' />
              Delete
            </Button>
          </span>
        )
      }
    ]
    return <Table columns={columns} dataSource={accountList} rowKey={(record) => record.username} />
  }
}

export default AccountList
