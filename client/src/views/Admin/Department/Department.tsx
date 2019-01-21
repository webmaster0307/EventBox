import React, { Component } from 'react'
import { Button, Divider } from 'antd'
import { inject, observer } from 'mobx-react'
import { withModal } from '@components'
import FormAddDepartment from './components/FormAddDepartment'
import DepartmentList from './components/DepartmentList'
import './styles.scss'

@withModal
@inject('stores')
@observer
class Department extends Component<any>{

  componentDidMount = () => {

  }

  handleOpenAdd = () => {
    const { modal } = this.props
    modal.show({
      title: 'Thêm mới Khoa',
      body: <FormAddDepartment onAddSuccess={this.handleAddSuccess} />,
    })
  }

  handleAddSuccess = (values: any) => {
    const { modal, stores } = this.props
    const { departmentStore } = stores.admin
    departmentStore.addDepartment(values)
    modal.close()
  }

  render() {
    return (
      <div>
        <Button type='primary' onClick={this.handleOpenAdd} >
          Thêm mới khoa
        </Button>
        <Divider />
        <DepartmentList />
      </div>
    )
  }
}

export default Department