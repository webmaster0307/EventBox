import gql from 'graphql-tag'

const DELETE_TICKET = gql`
  mutation($eventId: ID!, $ticketId: ID!) {
    deleteTicket(eventId: $eventId, ticketId: $ticketId)
  }
`

export { DELETE_TICKET }
