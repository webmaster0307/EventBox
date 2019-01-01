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

import * as routes from '@routes'
import { withRouter } from 'react-router-dom'

import { event } from '@gqlQueries'
import { message, Row, Spin, Col, Icon, Card, Button } from 'antd'
import { client } from '@client'
import moment from 'moment'
import 'moment/locale/vi'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState } from 'draft-js'

import './less/antMotionStyle.less'
import './eventdetail.scss'
const { location } = window

let isMobile
enquireScreen((b) => {
  console.log(b)
  isMobile = b
})

@inject('stores')
@observer
class Landing extends React.Component {
  componentWillMount () {
    this.props.stores.landing.checkScreen(isMobile)
  }

  componentDidMount () {
    enquireScreen(b => this.props.stores.landing.checkScreen(!!b))
    if (location.port) setTimeout(() => this.props.stores.landing.checkShow(true), 500)
  }

  render() {
    const { isShow } = this.props.stores.landing
    const { refetch } = this.props
    const children = [
      <Nav id='Nav' key='Nav' />,
      <EventItem id='eventdetail' key='detail' />,
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

@withRouter
@inject('stores')
@observer
class EventItem extends React.Component{

  state = {
    loading: true,
    event: undefined
  }

  componentDidMount = async () => {
    const { eventId } = this.props.match.params
    let result 
    try {
      result = await client.query({query: event.GET_EVENT_DETAIL, variables: { eventId }})
    } catch (error) {
      return message.error('Failed to fetch event')
    }
    this.setState({
      event: result.data.event,
      loading: false
    })
  }
  

  render() {
    // console.log('event: ',this.state.event)
    const { event, loading } = this.state
    
    return (
      <Spin spinning={loading}>
        {event &&
          <div className='event-landing-detail__wrapper' >
            <Row className='event-image-thumbnail__wrapper' >
              <img src={event && event.images.thumbnail} alt='thumbnail' />
            </Row>
            <Header event={event} className='event-header-info__wrapper' />
            <HeaderNav className='event-header-nav__wrapper' />
            <AboutEvent event={event} className='event-description__wrapper' />
            <AboutOrganization event={event} className='event-organization__wrapper' />
          </div>
        }
      </Spin>
    )
  }
}

const Header = (props) => {
  const { event } = props
  const time = moment(Number(event.startTime))
  // console.log('time: ', time.format('MMMM') )
  // console.log('time: ', time.format('dddd') )
  // console.log('time: ', time.format('DD') )

  return(
    <Row {...props} >
      <Col offset={4} span={2} >
        {/* {new Date(Number(event.startTime)).toDateString()} */}
        <div className='calendar-fake' >
          <div className='month' >
            {time.format('MMMM')}
          </div>
          <div className='date' >
            {time.format('DD')}
          </div>
          <div className='weekdate' >
            {time.format('dddd')}
          </div>
        </div>
      </Col>
      <Col span={8} >
        <div className='title' >
          {event.title}
        </div>
        <div className='start-time' >
          <Icon type='calendar' style={{fontSize: 16, marginRight: 16}} /> {new Date(Number(event.startTime)).toLocaleString()}
        </div>
        <div className='location' >
          <Icon type='environment' style={{fontSize: 16, marginRight: 16}} /> {event.location}
        </div>
        <div className='address' >
          {event.address}
        </div>
      </Col>
    </Row>
  )
}

const HeaderNav = (props) => {
  return(
    <Row {...props} >
      <Col offset={4}>
        <Row type='flex'>
          <div className='item' >
          Giới thiệu
          </div>
          <div className='item'>
          Thông tin vé
          </div>
          <div className='item'>
          Nhà tổ chức
          </div>
        </Row>
      </Col>
    </Row> 
  )
}

const AboutEvent = ({ className, event }) => (
  <div className={className} >
    <Card
      title='Giới thiệu'
    >
      <EditorWysiwyg editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(event.description)))} readOnly toolbarHidden />
    </Card>
  </div>
)

const AboutOrganization = ({ className, event }) => (
  <div className={className} >
    <Card
      title='Nhà tổ chức'
    >
      <div style={{display: 'flex'}} >
        <div style={{marginRight: 18}} >
          <img src={event.organizationLogo} style={{maxWidth: 132, maxHeight: 132}} />
        </div>
        <div>
          <div style={{color: '#000', fontWeight: 'bold', fontSize: 16}} >
            {event.organizationName}
          </div>
          <div>
            <p>{event.organizationDescription}</p>
          </div>
          <div>
            <Button type='primary' icon='mail' >Liên hệ nhà tổ chức</Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
)