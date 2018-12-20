import { observable, action } from 'mobx'
// import { client } from '@client'

import { languageConfig } from './landingData.source'

class Landing {
  @observable currentLangData = languageConfig.English
  @observable isMobile = false
  @observable isShow = true
  @observable isEnglish = true
  @observable buttonText = 'Tiếng Việt'
  @observable phoneOpen = false
  @observable menuHeight = 0

  @action
  checkScreen (r) {this.isMobile = r}

  @action
  checkShow (r) {this.isShow = r}

  @action
  changeLanguage () {
    if (this.isEnglish) {
      this.currentLangData = languageConfig.Vietnamese
      this.buttonText = 'English'
    } else {
      this.currentLangData = languageConfig.English
      this.buttonText = 'Tiếng Việt'
    }
    this.isEnglish = !this.isEnglish
  }

  @action
  handlePhoneClick (scrollHeight) {
    if (this.phoneOpen) {
      this.menuHeight = scrollHeight
    } else {
      this.menuHeight = 0
    }
    this.phoneOpen = !this.phoneOpen
  }

}


export default Landing