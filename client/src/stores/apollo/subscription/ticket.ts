import gql from 'graphql-tag'

const SUBSCRIBE_TICKET_CHECKIN = gql`
  subscription($eventId: ID!) {
    eventCheckedIn(eventId: $eventId) {
      id
      checkedIn
      checkedInTime
      userInfo {
        email
        lastname
        phoneNumber
      }
    }
  }
`

export { SUBSCRIBE_TICKET_CHECKIN }
