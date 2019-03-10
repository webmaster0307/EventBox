import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon, message, Popconfirm, Tooltip, Button } from 'antd'
import { DASHBOARD_EVENT } from '@routes'
import { Query, Mutation } from 'react-apollo'
import { event } from '@gqlQueries'
import { StatusTag, withModal } from '@components'
import SelectDepartments from './SelectDepartments'

const EventsWrapper = () => (
  <Query query={event.GET_PAGINATED_EVENTS_WITH_USERS}>
    {({ data, loading }) => (
      <EventList events={loading ? [] : data.events.edges} loading={loading} />
    )}
  </Query>
)
@withModal
class EventList extends Component {
  state = {
    statusFilter: undefined,
    pageSize: 5
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({ statusFilter: filters })
  }

  handlePageSizeChange = (current, size) => {
    this.setState({ pageSize: size })
  }

  handleOpenDepartments = (row) => {
    const { modal } = this.props
    const value = row.departments && row.departments.map((d) => d.id)
    const eventId = row.id
    modal.show({
      title: 'Departments',
      body: <SelectDepartments eventId={eventId} value={value} close={modal.close} />
    })
  }

  tableColumns = () => {
    let { statusFilter } = this.state
    statusFilter = statusFilter || {}

    return [
      {
        title: '',
        dataIndex: 'images',
        render: (images, record) => (
          <div>
            <img src={images.thumbnail} style={{ maxWidth: 42 }} alt='thumbnail' />
          </div>
        )
      },
      {
        title: 'Title',
        dataIndex: 'title',
        width: 280,
        render: (text, record) => (
          <div style={{ width: 260 }}>
            <Link to={`${DASHBOARD_EVENT}/detail/${record.id}`}>{text}</Link>
          </div>
        )
      },
      {
        title: '',
        dataIndex: 'id',
        render: (id) => (
          <Link to={`${DASHBOARD_EVENT}/update/${id}`}>
            <Icon type='edit' /> Edit
          </Link>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => <StatusTag status={status} />,
        filters: ['draft', 'in-review', 'active', 'rejected'].map((status) => ({
          text: <StatusTag status={status} />,
          value: status
        })),
        filteredValue: statusFilter.status || [],
        onFilter: (value, record) => record.status.includes(value)
      },
      {
        title: 'Owner',
        dataIndex: 'user',
        render: (text, record) => <div>{record.user && record.user.username}</div>
      },
      {
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (updatedAt) => <div>{new Date(updatedAt).toLocaleString()}</div>
      },
      {
        title: 'Checkin',
        render: (text, record) => (
          <Link
            to={{
              pathname: `${DASHBOARD_EVENT}/checkin/${record.id}`,
              state: { eventTitle: record.title }
            }}
          >
            <Tooltip title='Check-in reviews'>
              <Button shape='round' type='primary' icon='audit' />
            </Tooltip>
          </Link>
        )
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_, row) => [
          // <Popover
          //   key='publish'
          //   style={{ paddingTop: 50 }}
          //   content={<DepartmentSelection eventId={row.id} />}
          //   title='Danh sách Khoa'
          //   placement='topLeft'
          //   trigger='click'
          //   overlayClassName='deaprtment-selection-custom__wrapper'
          // >

          // </Popover>,
          <Tooltip title='Publish this event' key='publish'>
            <Icon
              type='solution'
              className='icon-primary-custom__wrapper'
              style={{ margin: '0 8px' }}
              onClick={() => this.handleOpenDepartments(row)}
            />
          </Tooltip>,
          <Mutation
            key='delete'
            mutation={event.DELETE_EVENT_BYID}
            variables={{ id: row.id }}
            update={(cache, { data: { deleteEvent } }) => {
              if (!deleteEvent) {
                return alert('Failed to delete')
              }
              message.success('Delete event successfully!')
              const data = cache.readQuery({
                query: event.GET_PAGINATED_EVENTS_WITH_USERS
              })

              cache.writeQuery({
                query: event.GET_PAGINATED_EVENTS_WITH_USERS,
                data: {
                  ...data,
                  events: {
                    ...data.events,
                    edges: data.events.edges.filter((node) => node.id !== row.id),
                    pageInfo: data.events.pageInfo
                  }
                }
              })
            }}
          >
            {(deleteEvent, { data, loading, error }) => (
              <Popconfirm
                placement='topRight'
                title='Are you sure to delete this event'
                onConfirm={deleteEvent}
                okText='Yes'
                cancelText='No'
              >
                <Tooltip title='Delete this event'>
                  <Icon type='delete' className='icon-primary-custom__wrapper' />
                </Tooltip>
              </Popconfirm>
            )}
          </Mutation>
        ]
      }
    ]
  }

  render() {
    const { events, loading } = this.props

    return (
      <Table
        dataSource={events}
        columns={this.tableColumns()}
        rowKey='id'
        loading={loading}
        onChange={this.handleTableChange}
        pagination={{
          pageSize: this.state.pageSize,
          size: 'small',
          total: events.length,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
          onShowSizeChange: this.handlePageSizeChange
        }}
      />
    )
  }
}

export default EventsWrapper
