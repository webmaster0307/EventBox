import { observable, action } from 'mobx'
import { client } from '@client'
import { GET_PAGINATED_EVENTS_WITH_USERS, GET_EVENT_DETAIL } from './localQueries'

const limitEventPerPage = 10

class Event {
  @observable eventsLoading = false
  @observable events = []
  @observable event

  // editor
  @observable editorEventCreate

  @action
  async getEvents(_events){
    this.eventsLoading = true
    let result 
    try {
      result = await client.query({ 
        query: GET_PAGINATED_EVENTS_WITH_USERS, 
        variables: { limit: limitEventPerPage },
        fetchPolicy: 'no-cache'
      })
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
    const { edges } = result.data.events
    this.events = edges
    this.eventsLoading = false
  }

  @action
  async getEventById(eventId){
    let result 
    try {
      result = await client.query({ query: GET_EVENT_DETAIL, variables: { eventId }, fetchPolicy: 'no-cache' })
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
    const { event } = result.data
    this.event = event
    return({ event })
  }
}


export default Event