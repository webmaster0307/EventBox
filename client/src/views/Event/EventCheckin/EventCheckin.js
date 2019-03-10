import React, { Component } from 'react'
import { List, Tooltip } from 'antd'
import './styles.scss'
import { Query } from 'react-apollo'
import { event as eventClient, eventUser } from '@gqlQueries'
import moment from 'moment'

const EventCheckinWrapper = (props) => {
  const { eventId } = props.match.params
  const { state } = props.location
  if (!state || !state.eventTitle) {
    return (
      <Query query={eventClient.GET_EVENT_TITLE} variables={{ eventId }}>
        {({ data, loading }) => (
          <div>
            <TitleWrapper event={data.event} />
            <EventCheckin {...props} />
          </div>
        )}
      </Query>
    )
  } else {
    return (
      <div>
        <TitleWrapper event={{ title: state.eventTitle }} />
        <EventCheckin {...props} />
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
  render() {
    const { eventId } = this.props.match.params

    return (
      <Query query={eventUser.TICKETS} variables={{ eventId }}>
        {({ data, loading }) => {
          console.log('loading: ', loading)
          console.log('data: ', data)
          return (
            <List
              size='large'
              loading={loading}
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={loading ? [] : data.tickets}
              renderItem={(item, index) => (
                <List.Item
                  className={`tag-custom-type-${item.checkedIn ? 'success' : 'error'} `}
                  actions={[
                    item.checkedInTime ? (
                      <Tooltip title={moment(item.checkedInTime).format('DD/MM/YYYY HH:mm:ss')}>
                        {moment(item.checkedInTime).fromNow()}
                      </Tooltip>
                    ) : (
                      'Not checked-in yet'
                    )
                  ]}
                >
                  {index + 1}. {item.userInfo && item.userInfo.email}
                </List.Item>
              )}
            />
          )
        }}
      </Query>
    )
  }
}
