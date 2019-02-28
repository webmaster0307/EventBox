import { observable, action } from 'mobx'
import { client } from '@client'
import { event } from './apollo'

const limitEventPerPage = 10

class Event {
  @observable eventsLoading = false
  @observable events = []
  @observable event

  // editor
  @observable editorEventCreate

  @action
  async getEvents(_events) {
    this.eventsLoading = true
    let result
    try {
      result = await client.query({
        query: event.GET_PAGINATED_EVENTS_WITH_USERS,
        variables: { limit: limitEventPerPage },
        fetchPolicy: 'network-only'
      })
    } catch ({ graphQLErrors }) {
      const error = graphQLErrors && graphQLErrors.map((item) => item.message).join(', ')
      return { error }
    }
    const { edges } = result.data.events
    this.events = edges
    this.eventsLoading = false
  }

  @action
  async getEventById(eventId) {
    let result
    try {
      result = await client.query({
        query: event.GET_EVENT_DETAIL,
        variables: { eventId },
        fetchPolicy: 'no-cache'
      })
    } catch ({ graphQLErrors }) {
      const error = graphQLErrors && graphQLErrors.map((item) => item.message).join(', ')
      return { error }
    }
    const { event: eventResult } = result.data
    this.event = eventResult
    return { event: eventResult }
  }

  @action
  async deleteEventById(eventId) {
    try {
      this.eventsLoading = true
      await client.mutate({
        mutation: event.DELETE_EVENT_BYID,
        variables: { id: eventId }
      })
      this.events = this.events.filter((item) => item.id !== eventId)
    } catch ({ graphQLErrors }) {
      console.log('graphQLErrors: ', graphQLErrors)
      const error = graphQLErrors && graphQLErrors.map((item) => item.message).join(', ')
      this.eventsLoading = false
      return { error }
    }
    this.eventsLoading = false
    return true
  }

  @action
  async joinEvent(userId, eventId) {
    try {
      const { data: { joinEvent } } = await client.mutate({
        mutation: event.JOIN_EVENT,
        variables: { userId, eventId }
      })
      return joinEvent
    } catch (error) {
      console.log('graphQLErrors: ', error)
    }
  }
}

export default Event
