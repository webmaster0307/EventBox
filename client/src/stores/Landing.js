import { observable, action } from 'mobx'
import { client } from '@client'
import { event } from '@gqlQueries'

class Landing {
  @observable isShow = true
  @observable isEnglish = true
  @observable buttonText = 'Tiếng Việt'
  @observable isMobile = false
  // For sign in modal
  @observable isSigningIn = false
  // For sign up modal
  @observable isSigningUp = false
  // Search bar
  @observable eventList = []

  @action
  checkScreen (r) {this.isMobile = r}

  @action
  checkShow (r) {this.isShow = r}

  @action
  changeLanguage () {
    if (this.isEnglish) {
      this.buttonText = 'English'
    } else {
      this.buttonText = 'Tiếng Việt'
    }
    this.isEnglish = !this.isEnglish
  }

  @action
  ocSignInModal (cmd) {
    if(cmd === 'o') {
      this.isSigningIn = true
    } else {
      this.isSigningIn = false
    }
  }

  @action
  ocSignUpModal (cmd) {
    if(cmd === 'o') {
      this.isSigningUp = true
    } else {
      this.isSigningUp = false
    }
  }

  @action
  async getEvents () {
    const { data: { events } } = await client.query({
      query: event.GET_PAGINATED_EVENTS_WITH_USERS,
      variables: {status: 'draft', limit: 5}
    })
    console.log(events.edges)
    // this.eventList = [...events.edges]
  }

  @action
  handleAutoCompleteSelect(value) {
    console.log(value)
  }

  @action
  handleAutoCompleteSearch = (value) => {
    this.eventList = !value ? [] : [
      value,
      value + value,
      value + value + value
    ]
  }

}


export default Landing