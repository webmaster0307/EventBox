import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom'
import * as routes from '@routes'

@inject('stores')
@observer
class DepartmentList extends Component<any>{

  componentDidMount = () => {
    const { departmentStore } = this.props.stores.admin
    departmentStore.getDepartments()
  }

  tableColumns = () => {
    return([
      {
        title: 'ID',
        dataIndex: 'id',
        render: (id: string) => <div>{id}</div>
      },
      {
        title: 'Tên khoa',
        dataIndex: 'name',
        render: (name: any, record:any) => 
          <div><Link to={`${routes.DB_ADMIN_DEPARTMENT}/${record.id}`} >{record.name}</Link></div>
      },
      {
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (updatedAt: string) => <div>{new Date(Number(updatedAt)).toLocaleString()}</div>
      },
    ])
  }

  render() {
    const { departments, listLoading: loading } = this.props.stores.admin.departmentStore

    return (
      <Table 
        dataSource={toJS(departments)} columns={this.tableColumns()} rowKey='id' loading={loading}
      />
    )
  }
}

export default DepartmentList