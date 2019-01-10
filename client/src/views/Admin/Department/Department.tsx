import React, { Component } from 'react'
import { Button, Divider } from 'antd'
import DepartmentStore from './DepartmentStore'
import { Provider, inject, observer } from 'mobx-react'
import { withModal } from '@components'
import FormAddDepartment from './components/FormAddDepartment'
import DepartmentList from './components/DepartmentList'
import './styles.scss'

@withModal
@inject('stores', 'departmentStore')
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
    const { modal, departmentStore } = this.props
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

@observer
class DepartmentWrapper extends Component {
  private departmentStore: any

  constructor(props: any){
    super(props)
    this.departmentStore = new DepartmentStore()
  }

  render() {
    return (
      <Provider departmentStore={this.departmentStore} >
        <Department />
      </Provider>
    )
  }
}

export default DepartmentWrapper