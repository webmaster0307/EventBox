import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Table, Tag, Spin } from 'antd'
import { inject, observer, Provider } from 'mobx-react'
import { DB_EVENT_REVIEW } from '@routes'
import EventReviewStore from './EventReviewStore'
import { Query } from 'react-apollo'
import { event } from '@gqlQueries'
import './styles.scss'

@inject('eventReviewStore')
@observer
class Events extends Component {
  componentDidMount = () => {
    /* eslint-disable */
    // const { eventReviewStore } = this.props
    // const { error } = eventReviewStore.getEvents()
    // if(error){
    //   return message.error(error)
    // }
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

  render() {
    // const { eventsLoading, events } = this.props.eventReviewStore
    // console.log('loading: ' ,this.props.stores.event.eventsLoading)
    // console.log('events: ',toJS(this.props.stores.event.events))

    // const { edges, pageInfo } = events

    return (
      <Query query={event.GET_EVENTS_INREVIEW} fetchPolicy='cache-and-network'>
        {({ data, loading, subscribeToMore }) => {
          if (loading || !data) {
            return <Spin />
          }
          const { edges, departmentIds } = data.eventsInReview
          return (
            <EventList
              events={edges}
              departmentIds={departmentIds}
              loading={false}
              subscribeToMore={subscribeToMore}
            />
          )
        }}
      </Query>
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

@withRouter
@inject('eventReviewStore')
@observer
class EventList extends Component {
  state = {
    pageSize: 5
  }

  goToReviewPage = (id) => {
    this.props.history.push(`${DB_EVENT_REVIEW}/${id}`)
  }

  subscribeToMoreEvent = () => {
    const { departmentIds } = this.props
    // console.log('departmentIds: ',departmentIds)
    this.props.subscribeToMore({
      document: event.SUBCRIBE_EVENT_REVIEW,
      variables: { departmentIds },
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult
        }
        const { eventSubmited } = subscriptionData.data

        /* eslint-disable */
        // message.success('New event is pending for approval')
        // notification.open({
        //   message: 'New pending Event',
        //   description: (
        //     <div>
        //       New event is waiting for approval.
        //       <div className='fake-link' onClick={() => this.goToReviewPage(eventSubmited.id)}>
        //         Review now!
        //       </div>
        //     </div>
        //   ),
        //   icon: <Icon type='solution' style={{ color: '#108ee9' }} />
        // })
        const previousEdges = previousResult.eventsInReview.edges.filter(
          (item) => item.id !== eventSubmited.id
        )
        return {
          ...previousResult,
          eventsInReview: {
            ...previousResult.eventsInReview,
            edges: [eventSubmited, ...previousEdges]
          }
        }
      }
    })
  }

  componentDidMount() {
    this.subscribeToMoreEvent()
  }

  handlePageSizeChange = (current, size) => {
    this.setState({ pageSize: size })
  }

  tableColumns = () => {
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
            <Link to={`${DB_EVENT_REVIEW}/${record.id}`}>{text}</Link>
          </div>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => (
          <Tag color='orange'>{status === 'in-review' ? 'In Review' : 'Undefined'}</Tag>
        )
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
      }
    ]
  }

  render() {
    const { events, loading } = this.props
    console.log('events: ', events)

    return (
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

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.eventReviewStore = new EventReviewStore()
  }

  render() {
    return (
      <Provider eventReviewStore={this.eventReviewStore}>
        <Events />
      </Provider>
    )
  }
}

export default Wrapper
