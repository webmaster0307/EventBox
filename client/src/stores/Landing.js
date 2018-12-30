import { observable, action } from 'mobx'
// import { client } from '@client'

class Landing {
  @observable isShow = true
  @observable isEnglish = true
  @observable buttonText = 'Tiếng Việt'
  @observable isMobile = false
  // For sign in modal
  @observable isSigningIn = false
  // For sign up modal
  @observable isSigningUp = false

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

}


export default Landing