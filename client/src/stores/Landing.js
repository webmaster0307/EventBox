import { observable, action, toJS, computed } from 'mobx'
import { client } from '@client'
import { event } from '@gqlQueries'
import i18n from '../constants/i18n'

class Landing {
  @observable isShow = true
  @observable isEnglish = false
  // @observable buttonText = 'Tiếng Việt'
  @observable isMobile = false
  // For sign in modal
  @observable isSigningIn = false
  // For sign up modal
  @observable isSigningUp = false
  // Search bar
  @observable allSuggestion = []
  @observable suggestion = []
  // Event list
  @observable eventList = []

  constructor(){
    if(i18n.language === 'en'){
      this.isEnglish = true
    }
  }

  @action
  checkScreen (r) {
    if (r === undefined) {
      this.isMobile = false
    }
    this.isMobile = r
  }

  @action
  checkShow (r) {this.isShow = r}

  @action
  changeLanguage () {
    // if (this.isEnglish) {
    //   this.buttonText = 'English'
    // } else {
    //   this.buttonText = 'Tiếng Việt'
    // }
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
      variables: { status: 'draft', limit: 8 }
    })

    if (events.edges.length) {
      this.allSuggestion = events.edges.map(e => {
        if (e.title.length > 90) {
          return e.title.substring(0, 90)
        } else {
          return e.title
        }
      })
    }

    this.eventList = [...events.edges]
  }

  @action
  handleAutoCompleteSelect(value) {
    console.log(value)
  }

  @action
  handleAutoCompleteSearch = (words) => {
    if (words) {
      this.suggestion = toJS(this.allSuggestion).filter(title => {
        return title.toLowerCase().indexOf(words.toLowerCase()) !== -1
      })
    } else {
      this.suggestion = []
    }
  }

  @computed get buttonText(){
    if (this.isEnglish) {
      return 'Tiếng Việt'
    } else {
      return 'English'
    }
  }
}


export default Landing