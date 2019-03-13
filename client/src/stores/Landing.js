import { observable, action } from 'mobx'
import { client } from '@client'
import { event } from '@gqlQueries'

class Landing {
  @observable isShow = true
  //
  @observable isMobile = false
  // For sign in modal
  @observable isSigningIn = false
  // For sign up modal
  @observable isSigningUp = false
  // Event list
  @observable eventList = []

  @action
  checkScreen(r) {
    if (r === undefined) {
      this.isMobile = false
    }
    this.isMobile = r
  }

  @action
  checkShow(r) {
    this.isShow = r
  }

  @action
  ocSignInModal(cmd) {
    if (cmd === 'o') {
      this.isSigningIn = true
    } else {
      this.isSigningIn = false
    }
  }

  @action
  ocSignUpModal(cmd) {
    if (cmd === 'o') {
      this.isSigningUp = true
    } else {
      this.isSigningUp = false
    }
  }

  @action
  async getEvents() {
    const {
      data: { eventsHome }
    } = await client.query({
      query: event.GET_EVENTS_HOMEPAGE,
      fetchPolicy: 'network-only'
    })

    if (eventsHome.length) {
      this.allSuggestion = eventsHome.map((e) => {
        if (e.title.length > 90) {
          return e.title.substring(0, 90)
        } else {
          return e.title
        }
      })
    }

    this.eventList = eventsHome
  }
}

export default Landing
