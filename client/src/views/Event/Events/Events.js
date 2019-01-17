import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon, message, Popconfirm } from 'antd'
import { DASHBOARD_EVENT } from '@routes'
import { Query, Mutation } from 'react-apollo'
import { event } from '@gqlQueries'
import { StatusTag } from '@components'

const EventsWrapper = () => (
  <Query
    query={event.GET_PAGINATED_EVENTS_WITH_USERS}
  >
    {({data, loading}) => (
      <EventList
        events={loading ? [] : data.events.edges}
        loading={loading}
      />
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
    
    return([
      {
        title: '',
        dataIndex: 'images',
        render: (images, record) => <div><img src={images.thumbnail} style={{maxWidth: 42}} alt='thumbnail' /></div>
      },
      {
        title: 'Title',
        dataIndex: 'title',
        width: 280,
        render: (text, record) => 
          <div style={{width: 260}} ><Link to={`${DASHBOARD_EVENT}/detail/${record.id}`} >{text}</Link></div>
      },
      {
        title: '',
        dataIndex: 'id',
        render: (id) => <Link to={`${DASHBOARD_EVENT}/update/${id}`} ><Icon type='edit' /> Edit</Link>
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: status => <StatusTag status={status} />,
        filters: ['draft', 'in-review', 'active', 'rejected'].map(status => ({
          text: <StatusTag status={status} />, value: status
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
        render: (updatedAt) => <div>{new Date(Number(updatedAt)).toLocaleString()}</div>
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_, row) => (
          <Mutation
            mutation={event.DELETE_EVENT_BYID}
            variables={{ id: row.id }}
            update={(cache, { data: { deleteEvent } }) => {
              if(!deleteEvent){
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
                    edges: data.events.edges.filter(node => node.id !== row.id),
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
                cancelText='No'>
                <Icon type='delete' className='icon-primary-custom__wrapper' />
              </Popconfirm>
            )}
          </Mutation>
        )
      }
    ])
  }

  render() {
    const { events, loading } = this.props

    return(
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