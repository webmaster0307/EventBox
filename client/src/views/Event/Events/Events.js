import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Table, Icon, message, Tag, Popconfirm } from 'antd'
import { inject, observer } from 'mobx-react'
import { DASHBOARD_EVENT } from '@routes'

const EVENT_CREATED = gql`
  subscription {
    eventCreated {
      event {
        id
        title
        description
        status
        images {
          thumbnail
        }
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`

@inject('stores')
@observer
class Events extends Component {
  
  componentDidMount = () => {
    const { event } = this.props.stores
    const { error } = event.getEvents()
    if(error){
      return message.error(error)
    }
    
    // let result 
    // try {
    //   result = await client.query({ query: GET_PAGINATED_EVENTS_WITH_USERS, variables: { limit } })
    // } catch ({graphQLErrors}) {
    //   const msg = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
    //   return message.error(msg)
    // }
    // const { events } = result.data
    // const { event } = this.props.stores
    // console.log('event: ' ,events)
    // event.updateEvents(events.edges)
  }
  

  render(){
    const { eventsLoading, events } = this.props.stores.event
    // console.log('loading: ' ,this.props.stores.event.eventsLoading)
    // console.log('events: ',toJS(this.props.stores.event.events))

    // const { edges, pageInfo } = events

    return (
      <Fragment>
        <EventList
          events={events}
          loading={eventsLoading}
          // subscribeToMore={subscribeToMore}
        />

        {/* {pageInfo.hasNextPage && (
          <MoreEventsButton
            limit={limit}
            pageInfo={pageInfo}
            fetchMore={fetchMore}
          >
        More
          </MoreEventsButton>
        )} */}
      </Fragment>
    )
  }
}

// const MoreEventsButton = ({
//   limit,
//   pageInfo,
//   fetchMore,
//   children
// }) => (
//   <button
//     type="button"
//     onClick={() =>
//       fetchMore({
//         variables: {
//           cursor: pageInfo.endCursor,
//           limit
//         },
//         updateQuery: (previousResult, { fetchMoreResult }) => {
//           if (!fetchMoreResult) {
//             return previousResult
//           }

//           return {
//             events: {
//               ...fetchMoreResult.events,
//               edges: [
//                 ...previousResult.events.edges,
//                 ...fetchMoreResult.events.edges
//               ]
//             }
//           }
//         }
//       })
//     }
//   >
//     {children}
//   </button>
// )

@inject('stores')
@observer
class EventList extends Component {

  state = {
    statusFilter: undefined,
    pageSize: 5
  }

  subscribeToMoreEvent = () => {
    this.props.subscribeToMore({
      document: EVENT_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult
        }

        const { eventCreated } = subscriptionData.data

        return {
          ...previousResult,
          events: {
            ...previousResult.events,
            edges: [
              eventCreated.event,
              ...previousResult.events.edges
            ]
          }
        }
      }
    })
  };

  componentDidMount() {
    // this.subscribeToMoreEvent()
  }

  handleDeleteEvent = async (id) => {
    const { event } = this.props.stores
    const { error } = await event.deleteEventById(id)
    if(error){
      message.error(error)
    }
    else{
      message.success('Delete event successfully!')
    }
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
        render: status => {
          switch(status){
            case 'draft': {
              return <Tag color='blue'>Draft</Tag>
            }
            case 'in-review': {
              return <Tag color='orange'>In Review</Tag>
            }
            default: {
              return <Tag color='blue'>{status}</Tag> 
            }
          }
        },
        filters: [
          { text: <Tag color='orange'>In Review</Tag>, value: 'in-review' },
          { text: <Tag color='blue'>Draft</Tag>, value: 'draft' }
        ],
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
          <Popconfirm 
            placement='topRight' 
            title='Are you sure to delete this event' 
            onConfirm={() => this.handleDeleteEvent(row.id)} 
            okText='Yes' 
            cancelText='No'>
            <Icon type='delete' className='icon-primary-custom__wrapper' />
          </Popconfirm>
        )
      }
    ])
  }

  render() {
    const { events, loading } = this.props

    return(
      // <Query query={getSession} >
      //   {({ data }) => {
      //     const { me } = data
      //     return(
      //       events.map(event => (
      //         <EventItem key={event.id} event={event} me={me} />
      //       ))
      //     )
      //   }}
      // </Query>
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

export default Events