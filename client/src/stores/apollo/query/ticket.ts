import gql from 'graphql-tag'

const TICKETS = gql`
  query($eventId: ID!) {
    tickets(eventId: $eventId) {
      id
      code
      ticketSvgSrc
      checkedIn
      checkedInTime
      userInfo {
        email
        username
        phoneNumber
      }
      createdAt
    }
  }
`

const MY_TICKETS = gql`
  query($limit: Int) {
    myTickets(limit: $limit) {
      code
      ticketSvgSrc
      checkedIn
      checkedInTime
      eventInfo {
        title
      }
      createdAt
    }
  }
`

export { TICKETS, MY_TICKETS }
