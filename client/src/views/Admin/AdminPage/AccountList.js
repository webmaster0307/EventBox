import React, { Component } from 'react'
import { Button, Icon, Tag, Select, PageHeader, message } from 'antd'

import { Query } from 'react-apollo'
import { user } from '@gqlQueries'

import { AgGridReact } from 'ag-grid-react'
import { localeText, icons, postProcessPopup, getRowHeight } from '../../../constants/localeConfigs'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './index.css'

const { Option } = Select

class AccountList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridOptions: {
        icons,
        postProcessPopup,
        getRowHeight,
        pagination: true,
        animateRows: true,
        localeText,
        paginationPageSize: 10,
        rowClass: 'newDesign',
        frameworkComponents: {
          IsActivatedRenderer,
          RoleRenderer,
          FullNameRenderer,
          ActionRenderer
        }
      }
    }
  }

  getDefaultColDef() {
    return {
      sortable: true,
      resizable: true,
      cellClass: 'newDesign',
      headerClass: 'newDesign',
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith'],
        newRowsAction: 'keep',
        suppressAndOrCondition: true
      }
    }
  }

  getColumnDefs() {
    return [
      {
        headerName: 'Username',
        field: 'username'
      },
      {
        headerName: 'Email',
        field: 'email'
      },
      {
        headerName: 'Full name',
        field: 'fullname',
        cellRenderer: 'FullNameRenderer'
      },
      {
        headerName: 'Role',
        field: 'role',
        cellRenderer: 'RoleRenderer'
      },
      {
        headerName: 'Is Activated',
        field: 'isActivated',
        filter: false,
        cellRenderer: 'IsActivatedRenderer'
      },
      {
        headerName: 'Action',
        field: 'action',
        sortable: false,
        editable: false,
        filter: false,
        cellRenderer: 'ActionRenderer'
      }
    ]
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    if (params.api) params.api.sizeColumnsToFit()
  }

  onPageSizeChanged = newPageSize => {
    this.gridApi.paginationSetPageSize(newPageSize)
  }

  render() {
    const { gridOptions } = this.state
    return (
      <>
        <Query query={user.GET_ALL_USERS}>
          {({loading, error, data: { users }, refetch}) => {
            if (loading) return 'Loading...'
            if (error) return message.error(error)
            return (
              <PageHeader
                extra={[
                  <Button key='0' type='primary' ghost>Refresh</Button>,
                  <Select
                    key='1'
                    defaultValue={gridOptions.paginationPageSize}
                    style={{ width: 120 }}
                    onChange={this.onPageSizeChanged}
                  >
                    <Option value={10}>10 rows/page</Option>
                    <Option value={20}>20 rows/page</Option>
                    <Option value={50}>50 rows/page</Option>
                    <Option value={100}>100 rows/page</Option>
                  </Select>
                ]}
                footer={
                  <div
                    className='ag-theme-balham'
                    style={{ height: '65vh', width: '100%' }}
                  >
                    <AgGridReact
                      gridOptions={gridOptions}
                      columnDefs={this.getColumnDefs()}
                      rowData={users}
                      defaultColDef={this.getDefaultColDef()}
                      onGridReady={this.onGridReady}
                    />
                  </div>
                }
              />
            )
          }}
        </Query>
      </>
    )
  }
}

class FullNameRenderer extends Component {
  render() {
    const { data } = this.props
    return `${data.lastname} ${data.firstname}`
  }
}

class RoleRenderer extends Component {
  render() {
    const { value } = this.props
    return (
      <>
        {value.map(role => (
          <Tag
            key={role}
            color={
              role === 'admin'
                ? 'red'
                : role === 'user'
                  ? 'blue'
                  : 'purple'
            }
          >
            {role}
          </Tag>
        ))}
      </>
    )
  }
}

class IsActivatedRenderer extends Component {
  render() {
    const { value } = this.props
    return <Tag color={value ? 'blue' : 'red'}>{value ? 'Already' : 'Not yet'}</Tag>
  }
}

class ActionRenderer extends Component {
  render() {
    // const { value } = this.props
    return (
      // <Mutation mutation={user.DELETE_USER}>
      //   {(deleteUser, { data }) => {
      //     console.log(deleteUser)
      //     return (
      //       <Button>Delete</Button>
      //     )
      //   }}
      // </Mutation>
      <Button.Group size='small'>
        <Button type='primary' ghost>
          <Icon type='edit' /> Edit
        </Button>
        <Button type='danger' ghost>
          Delete <Icon type='delete' />
        </Button>
      </Button.Group>
    )
  }
}

export default AccountList
