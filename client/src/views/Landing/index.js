import React from 'react'
import { enquireScreen } from 'enquire-js'

import 'antd/dist/antd.css'

import Nav from './components/Layout/Nav'
import Banner from './components/Layout/Banner'
import FirstSection from './components/Layout/FirstSection'
import SecondSection from './components/Layout/SecondSection'
import ThirdSection from './components/Layout/ThirdSection'
import Footer from './components/Layout/Footer'

import { languageConfig } from './data.source'
import './less/antMotionStyle.less'

const { location } = window

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      show: !location.port,
      isEnglish: true,
      buttonText: 'Tiếng Việt'
    }
  }

  async componentDidMount() {
    await enquireScreen((b) => {
      this.setState({ isMobile: !!b })
    })

    if (location.port) {
      setTimeout(() => {
        this.setState({ show: true })
      }, 500)
    }
  }

  changeLanguage = () => {
    this.setState({
      isEnglish: !this.state.isEnglish,
      buttonText: this.state.buttonText === 'Tiếng Việt' ? 'English' : 'Tiếng Việt'
    })
  }

  render() {
    const { isEnglish, isMobile, show } = this.state
    const { English, Vietnamese } = languageConfig

    const children = [
      <Nav
        id="Nav"
        key="Nav"
        switch={this.changeLanguage.bind(this)}
        buttonText={this.state.buttonText}
        textData={isEnglish ? English : Vietnamese}
        isMobile={isMobile}
      />,
      <Banner
        id="Banner"
        key="Banner"
        textData={isEnglish ? English : Vietnamese}
        isMobile={isMobile}
      />,
      <FirstSection
        id="FirstSection"
        key="FirstSection"
        textData={isEnglish ? English : Vietnamese}
        isMobile={isMobile}
      />,
      <SecondSection
        id="SecondSection"
        key="SecondSection"
        textData={isEnglish ? English : Vietnamese}
        isMobile={isMobile}
      />,
      <ThirdSection
        id="ThirdSection"
        key="ThirdSection"
        textData={isEnglish ? English : Vietnamese}
        isMobile={isMobile}
      />,
      <Footer
        id="Footer"
        key="Footer"
        textData={isEnglish ? English : Vietnamese}
        isMobile={isMobile}
      />
    ]

    return (
      <div
        className='templates-wrapper'
        ref={(d) => { this.dom = d }}
      >
        {show && children}
      </div>
    )
  }
}


export default Landing