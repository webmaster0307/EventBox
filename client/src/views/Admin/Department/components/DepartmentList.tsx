import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import { toJS } from 'mobx';

@inject('stores', 'departmentStore')
@observer
class DepartmentList extends Component<any>{

  componentDidMount = () => {
    const { departmentStore } = this.props
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
        render: (name: string) => <div>{name}</div>
      },
      {
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (updatedAt: string) => <div>{new Date(Number(updatedAt)).toLocaleString()}</div>
      },
    ])
  }

  render() {
    const { departments, listLoading: loading } = this.props.departmentStore

    return (
      <Table 
        dataSource={toJS(departments)} columns={this.tableColumns()} rowKey='id' loading={loading}
      />
    )
  }
}

export default DepartmentList