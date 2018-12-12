import { observable, action } from 'mobx'
import { client } from '@client'
import { GET_PAGINATED_EVENTS_WITH_USERS } from './localQueries'

const limitEventPerPage = 10

class Event {
  @observable eventsLoading = false
  @observable events = []

  @action
  async getEvents(_events){
    this.eventsLoading = true
    let result 
    try {
      result = await client.query({ query: GET_PAGINATED_EVENTS_WITH_USERS, variables: { limit: limitEventPerPage } })
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
    const { edges } = result.data.events
    this.events = edges
    this.eventsLoading = false
  }
}


export default Event