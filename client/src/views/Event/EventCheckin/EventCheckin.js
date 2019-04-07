import React, { Component } from 'react'
import { List, Tooltip, notification } from 'antd'
import './styles.scss'
import { Query } from 'react-apollo'
import { ticket } from '@gqlQueries'
import moment from 'moment'
import gql from 'graphql-tag'

const EventCheckinWrapper = (props) => {
  const { eventId } = props.match.params
  const { state } = props.location
  if (!state || !state.eventTitle) {
    return (
      <Query
        query={gql`event(id: ${eventId}){
            title
          }`}
        variables={{ eventId }}
      >
        {({ data, loading }) => (
          <div>
            <TitleWrapper event={data.event} />
            <EventCheckin {...props} />
            <Query query={ticket.TICKETS} variables={{ eventId }}>
              {({ data, loading, subscribeToMore }) => (
                <EventCheckin
                  eventId={eventId}
                  loading={loading}
                  tickets={data.tickets}
                  subscribeToMore={subscribeToMore}
                />
              )}
            </Query>
          </div>
        )}
      </Query>
    )
  } else {
    return (
      <div>
        <TitleWrapper event={{ title: state.eventTitle }} />
        <Query query={ticket.TICKETS} variables={{ eventId }}>
          {({ data, loading, subscribeToMore }) => (
            <EventCheckin
              eventId={eventId}
              loading={loading}
              tickets={data.tickets}
              subscribeToMore={subscribeToMore}
            />
          )}
        </Query>
      </div>
    )
  }
}

const TitleWrapper = ({ event }) => (
  <div style={{ padding: '10px' }}>
    <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
      {event && event.title}
    </h1>
  </div>
)

export default EventCheckinWrapper

class EventCheckin extends Component {
  subscribeToMoreTicket = () => {
    const { eventId } = this.props
    this.props.subscribeToMore({
      document: ticket.SUBSCRIBE_TICKET_CHECKIN,
      variables: { eventId },
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult
        }

        const {
          eventCheckedIn: {
            userInfo: { email }
          }
        } = subscriptionData.data
        notification.success({
          message: 'News',
          description: (
            <div>
              <span style={{ fontWeight: 'bold' }}>{email}</span> has just checked-in
            </div>
          )
        })
      }
    })
  }

  componentDidMount = () => {
    this.subscribeToMoreTicket()
  }

  render() {
    const { tickets, loading } = this.props

    return (
      <List
        size='large'
        loading={loading}
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={loading ? [] : tickets}
        className='event-checkin-list__wrapper'
        renderItem={(item, index) => (
          <List.Item
            className={`tag-custom-type-${item.checkedIn ? 'success' : 'error'} `}
            actions={[
              item.checkedInTime ? (
                <Tooltip title={moment(item.checkedInTime).format('DD/MM/YYYY HH:mm:ss')}>
                  {moment(item.checkedInTime).fromNow()}
                </Tooltip>
              ) : (
                'Ticket available'
              )
            ]}
          >
            {index + 1}.{' '}
            {item.userInfo &&
              item.userInfo.email &&
              item.userInfo.lastname &&
              item.userInfo.phoneNumber}
          </List.Item>
        )}
      />
    )
  }
}
