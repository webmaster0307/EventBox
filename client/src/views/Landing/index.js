import React from 'react'
import { enquireScreen } from 'enquire-js'
import { inject, observer } from 'mobx-react'

import SignInModal from './components/Authentication/SignIn'
import SignUpModal from './components/Authentication/SignUp'

import Nav from './components/Nav'
import Banner from './components/Banner'
import FirstSection from './components/FirstSection'
import SecondSection from './components/SecondSection'
import CarouselSection from './components/CarouselSection'
import ThirdSection from './components/ThirdSection'
import Footer from './components/Footer'

/* eslint-disable */
import EventItem from './EventDetail'
import * as routes from '@routes'
import { Switch, Route } from 'react-router-dom'

import './less/antMotionStyle.less'
const { location } = window

let isMobile
enquireScreen((b) => {
  // console.log(b)
  isMobile = b
})

@inject('stores')
@observer
class Landing extends React.Component {
  componentWillMount() {
    this.props.stores.landing.checkScreen(isMobile)
  }

  componentDidMount() {
    enquireScreen((b) => this.props.stores.landing.checkScreen(!!b))
    if (location.port) setTimeout(() => this.props.stores.landing.checkShow(true), 500)

    this.props.stores.landing.getEvents()
  }

  render() {
    const { isShow } = this.props.stores.landing
    const { refetch } = this.props
    const children = [
      <Nav id='Nav' key='Nav' />,
      <Banner id='Banner' key='Banner' />,
      <FirstSection id='FirstSection' key='FirstSection' />,
      <SecondSection id='SecondSection' key='SecondSection' />,
      <CarouselSection id='CarouselSection' key='CarouselSection' />,
      <ThirdSection id='ThirdSection' key='ThirdSection' />,
      <Footer id='Footer' key='Footer' />
    ]

    return (
      <div
        className='templates-wrapper'
        ref={(d) => {
          this.dom = d
        }}
      >
        <SignInModal refetch={refetch} />
        <SignUpModal refetch={refetch} />
        {isShow && children}
      </div>
    )
  }
}

export default Landing
