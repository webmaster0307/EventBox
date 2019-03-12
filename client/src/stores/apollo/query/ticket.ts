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
      }
      createdAt
    }
  }
`
export { TICKETS }
