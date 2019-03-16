import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { ticket } from '@gqlQueries'
import { List, Tooltip, Row, Col, Card } from 'antd'
import './styles.scss'
import { withTranslation } from 'react-i18next'
const moment = require('moment')

const TicketWrapper = () => {
  const [ticket, setTicket] = useState()
  // console.log('ticket: ', ticket)

  return (
    <Row>
      <Col span={14}>
        <Tickets setTicket={setTicket} />
      </Col>
      <Col span={10} style={{ paddingLeft: 14 }}>
        <TicketInfo ticket={ticket || {}} />
      </Col>
    </Row>
  )
}

export default TicketWrapper

const Tickets = ({ setTicket }) => (
  <Query query={ticket.MY_TICKETS}>
    {({ data, loading }) => {
      const { myTickets } = data
      return (
        <List
          size='large'
          loading={loading}
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={loading ? [] : myTickets}
          className='my-ticket-list__wrapper'
          renderItem={(item, index) => (
            <List.Item
              onClick={() => setTicket(item)}
              className={`tag-custom-type-${item.checkedIn ? 'used' : 'available'} `}
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
              {index + 1}. {item.eventInfo && item.eventInfo.title}
            </List.Item>
          )}
        />
      )
    }}
  </Query>
)

const TicketInfo = withTranslation()(
  ({ t: trans, ticket }) =>
    Object.keys(ticket).length > 0 && (
      <Card>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {ticket.eventInfo && ticket.eventInfo.title}
        </h1>
        <div>
          <label style={{ color: '#616161' }}>{trans('Ticket status')}: </label>
          <span
            style={{
              color: `${ticket.checkedIn ? '#757575' : '#388e3c'}`,
              fontStyle: `${ticket.checkedIn ? 'italic' : 'normal'}`
            }}
          >
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
