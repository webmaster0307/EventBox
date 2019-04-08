import React, { Component } from 'react'
import { List, Tooltip, notification, Row, Col, Card, Affix } from 'antd'
import './styles.scss'
import { Query } from 'react-apollo'
import { ticket } from '@gqlQueries'
import moment from 'moment'
import gql from 'graphql-tag'
import { observable } from 'mobx'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

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
  @observable ticket

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

  @observer
  render() {
    const { tickets, loading } = this.props

    return (
      <Row>
        <Col span={14}>
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
                onClick={() => {
                  this.ticket = item
                }}
              >
                <List.Item.Meta title={`${index + 1}. ${item.userInfo && item.userInfo.email}`} />
              </List.Item>
            )}
          />
        </Col>
        <Col span={10} style={{ paddingLeft: 14 }}>
          <Affix offsetTop={30}>
            <TicketInfo ticket={this.ticket || {}} />
          </Affix>
        </Col>
      </Row>
    )
  }
}

const TicketInfo = withTranslation()(
  observer(
    ({ t: trans, ticket }) =>
      Object.keys(ticket).length > 0 && (
        <Card>
          <div>
            <label style={{ color: '#616161' }}>{trans('Ticket Email')}: </label>
            <span style={{ color: '#424242' }}>{ticket.userInfo && ticket.userInfo.email}</span>
          </div>
          <div>
            <label style={{ color: '#616161' }}>{trans('Ticket username')}: </label>
            <span style={{ color: '#424242' }}>{ticket.userInfo && ticket.userInfo.username}</span>
          </div>
          <div>
            <label style={{ color: '#616161' }}>{trans('Ticket status')}: </label>
            <span
              style={{
                color: `${ticket.checkedIn ? '#757575' : '#388e3c'}`,
                fontStyle: `${ticket.checkedIn ? 'italic' : 'normal'}`
              }}
            >
              {' '}
              {/* eslint-disable */}
              {ticket.checkedIn
                ? `${trans('Ticket is used')} - ${moment(ticket.checkedInTime).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )}`
                : trans('Ticket is available')}
            </span>
          </div>
          <div style={{ marginTop: 12 }}>
            <img
              src={ticket.ticketSvgSrc}
              style={{ backgroundColor: '#fff' }}
              width={280}
              alt='ticket_qrcode'
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ color: '#616161' }}>{trans('Ticket code')}: </label>
            <span style={{ color: '#424242' }}>{ticket.code}</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ color: '#616161' }}>{trans('Ticket registered at')}: </label>
            <span style={{ color: '#424242' }}>
              {moment(ticket.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </span>
          </div>
        </Card>
      )
  )
)
