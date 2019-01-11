import { observable, action } from 'mobx'
import { client } from '@client'
import { event } from '@gqlQueries'

// const limitEventPerPage = 10

class EventReviewStore {
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
        query: event.GET_EVENTS_INREVIEW, 
        fetchPolicy: 'no-cache'
      })
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
    // console.log('result: ',result.data)
    const { edges } = result.data.eventsInReview
    this.events = edges
    this.eventsLoading = false
  }

  @action
  async getEventById(eventId){
    let result 
    try {
      result = await client.query({ query: event.GET_EVENT_DETAIL, variables: { eventId }, fetchPolicy: 'no-cache' })
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
    const { event: eventResult } = result.data
    this.event = eventResult
    return({ event: eventResult })
  }

}


export default EventReviewStore