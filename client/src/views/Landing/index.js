import React from 'react'
import { enquireScreen } from 'enquire-js'
import { inject, observer } from 'mobx-react'

import SignInModal from './components/Authentication/SignIn'
import SignUpModal from './components/Authentication/SignUp'

import Nav from './components/Nav'
import Banner from './components/Banner'
import FirstSection from './components/FirstSection'
import SecondSection from './components/SecondSection'
import ThirdSection from './components/ThirdSection'
import Footer from './components/Footer'

import './less/antMotionStyle.less'
const { location } = window

@inject('stores')
@observer
class Landing extends React.Component {
  componentDidMount() {
    const { landing } = this.props.stores
    enquireScreen(b => landing.checkScreen(!!b))
    if (location.port) setTimeout(() => landing.checkShow(true), 500)
  }

  render() {
    const { isShow } = this.props.stores.landing
    const { refetch } = this.props
    const children = [
      <Nav id='Nav' key='Nav' />,
      <Banner id='Banner' key='Banner' />,
      <FirstSection id='FirstSection' key='FirstSection' />,
      <SecondSection id='SecondSection' key='SecondSection' />,
      <ThirdSection id='ThirdSection' key='ThirdSection' />,
      <Footer id='Footer' key='Footer' />
    ]

    return (
      <div
        className='templates-wrapper'
        ref={(d) => { this.dom = d }}
      >
        <SignInModal refetch={refetch} />
        <SignUpModal refetch={refetch} />
        {isShow && children}
      </div>
    )
  }
}


export default Landing