import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Icon,
  message,
  Popconfirm,
  Checkbox,
  Tooltip,
  Popover,
  Spin,
  Button,
  Row
} from 'antd'
import { DASHBOARD_EVENT } from '@routes'
import { Query, Mutation } from 'react-apollo'
import { event, department } from '@gqlQueries'
import { StatusTag } from '@components'

const { Group: CheckboxGroup } = Checkbox

const EventsWrapper = () => (
  <Query query={event.GET_PAGINATED_EVENTS_WITH_USERS}>
    {({ data, loading }) => (
      <EventList events={loading ? [] : data.events.edges} loading={loading} />
    )}
  </Query>
)

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
        title: 'Action',
        dataIndex: 'action',
        render: (_, row) => [
          <Popover
            key='publish'
            style={{ paddingTop: 50 }}
            content={<DepartmentSelection eventId={row.id} />}
            title='Danh sách Khoa'
            placement='topLeft'
            trigger='click'
            overlayClassName='deaprtment-selection-custom__wrapper'
          >
            <Tooltip title='Publish this event'>
              <Icon
                type='solution'
                className='icon-primary-custom__wrapper'
                style={{ margin: '0 8px' }}
              />
            </Tooltip>
          </Popover>,
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

// let departmentIds = []
// const selectDepartments = ids => {
//   departmentIds = ids
//   console.log('departmentIds: ',departmentIds)
// }

class DepartmentSelection extends Component {
  state = {
    departmentIds: []
  }

  selectDepartments = (departmentIds) => {
    this.setState({ departmentIds })
  }

  render() {
    const { eventId } = this.props
    return (
      <div style={{ width: 200, minHeight: 120 }}>
        <Query query={department.GET_EVENT_DEPARTMENTS}>
          {({ data, loading }) => {
            if (loading) {
              return <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
            }
            const options = data.eventDepartments.map((item) => ({
              label: item.name,
              value: item.id
            }))
            return <CheckboxGroup options={options} onChange={this.selectDepartments} />
          }}
        </Query>
        <Mutation
          mutation={event.PUBLISH_EVENT_BYID}
          variables={{
            id: eventId,
            departmentIds: this.state.departmentIds
          }}
          update={(cache, { data: { publishEvent } }) => {
            if (!publishEvent) {
              // return alert('Failed to delete')
            }
            try {
              const data = cache.readQuery({
                query: event.GET_PAGINATED_EVENTS_WITH_USERS
              })
              cache.writeQuery({
                query: event.GET_PAGINATED_EVENTS_WITH_USERS,
                data: {
                  ...data,
                  events: {
                    ...data.events,
                    edges: data.events.edges.map((node) => {
                      if (node.id === eventId) {
                        return {
                          ...node,
                          status: 'in-review'
                        }
                      } else {
                        return node
                      }
                    }),
                    pageInfo: data.events.pageInfo
                  }
                }
              })
            } catch (error) {
              // console.log('error: ',error)
            }
          }}
        >
          {(publishEvent, { data, loading, error }) => (
            <Popconfirm
              placement='top'
              title='Are you sure to publish this event'
              onConfirm={publishEvent}
              okText='Yes'
              cancelText='No'
            >
              <Row type='flex' justify='center' style={{ padding: 12 }}>
                <Button type='primary'>Publish</Button>
              </Row>
            </Popconfirm>
          )}
        </Mutation>
      </div>
    )
  }
}
