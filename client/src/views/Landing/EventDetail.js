import React from 'react'
import { enquireScreen } from 'enquire-js'
import { inject, observer } from 'mobx-react'

import SignInModal from './components/Authentication/SignIn'
import SignUpModal from './components/Authentication/SignUp'
import Nav from './components/Nav'
import Footer from './components/Footer'

import { withRouter } from 'react-router-dom'
import { Link, Events, scroller } from 'react-scroll'

import { event } from '@gqlQueries'
import { message, Row, Spin, Col, Icon, Card, Button, BackTop } from 'antd'
import { client } from '@client'
import moment from 'moment'
import 'moment/locale/vi'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState } from 'draft-js'
import { RegisterButton } from './EventDetailComps'

import './less/antMotionStyle.less'
import './eventdetail.scss'
const { location } = window

let isMobile
enquireScreen((b) => {
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

@withRouter
@inject('stores')
@observer
class EventItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      event: undefined
    }
  }

  componentDidMount = async () => {
    await this.props.stores.me.getMe()
    const { eventId: slug } = this.props.match.params
    const eventId = slug.split('-')[slug.split('-').length - 1]
    let result
    try {
      result = await client.query({
        query: event.GET_EVENT_DETAIL,
        variables: { eventId }
      })
    } catch (error) {
      return message.error('Failed to fetch event')
    }
    this.setState({
      event: result.data.event,
      loading: false
    })

    Events.scrollEvent.register('begin')

    Events.scrollEvent.register('end')
  }

  scrollTo = () => {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }
  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve()
        Events.scrollEvent.remove('end')
      })

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    })

    /* eslint-disable */
    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      })
    )
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  render() {
    const { event, loading } = this.state

    return (
      <Spin spinning={loading}>
        {event && (
          <div className='event-landing-detail__wrapper'>
            <Row className='event-image-thumbnail__wrapper'>
              <img src={event && event.images.thumbnail} alt='thumbnail' />
            </Row>
            <Header event={event} className='event-header-info__wrapper' />
            <HeaderNav className='event-header-nav__wrapper' />
            <AboutEvent event={event} className='event-description__wrapper' />
            <AboutOrganization event={event} className='event-organization__wrapper' />
            <BackTop />
          </div>
        )}
      </Spin>
    )
  }
}

const Header = (props) => {
  const { event, ...rest } = props
  const time = moment(event.startTime)
  const explicitTime = moment(event.startTime).format('LLLL')

  return (
    <Row {...rest}>
      <Col offset={4} span={2}>
        {/* {new Date(Number(event.startTime)).toDateString()} */}
        <div className='calendar-fake'>
          <div className='month'>{time.format('MMMM')}</div>
          <div className='date'>{time.format('DD')}</div>
          <div className='weekdate'>{time.format('dddd')}</div>
        </div>
      </Col>
      <Col span={8}>
        <div className='title'>{event.title}</div>
        <div className='start-time'>
          <Icon type='calendar' style={{ fontSize: 16, marginRight: 16 }} />{' '}
          {`${explicitTime.charAt(0).toUpperCase()}${explicitTime.substring(1)}`}
        </div>
        <div className='location'>
          <Icon type='environment' style={{ fontSize: 16, marginRight: 16 }} /> {event.location}
        </div>
        <div className='address'>{event.address}</div>
      </Col>
      <Col span={6}>
        {/* <Button type='primary' icon='fire' onClick={() => console.log('event: ', event)}>
          Đăng ký ngay
        </Button> */}
        <RegisterButton eventId={event.id} />
      </Col>
    </Row>
  )
}

const HeaderNav = (props) => {
  return (
    <Row {...props}>
      <Col offset={4}>
        <Row type='flex'>
          <div className='item'>
            <Link to='inTroduce' offset={-56} spy smooth duration={600}>
              Giới thiệu
            </Link>
          </div>
          <div className='item'>
            <Link to='organizer' offset={-56} spy smooth duration={800}>
              Nhà tổ chức
            </Link>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

const AboutEvent = ({ className, event }) => (
  <div className={className} name='inTroduce'>
    <Card title='Giới thiệu'>
      <EditorWysiwyg
        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(event.description)))}
        readOnly
        toolbarHidden
      />
    </Card>
  </div>
)

const AboutOrganization = ({ className, event }) => (
  <div className={className} name='organizer'>
    <Card title='Nhà tổ chức'>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 18 }}>
          <img
            src={event.organizationLogo}
            style={{ maxWidth: 132, maxHeight: 132 }}
            alt='organization_logo'
          />
        </div>
        <div>
          <div
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 16
            }}
          >
            {event.organizationName}
          </div>
          <div>
            <p>{event.organizationDescription}</p>
          </div>
          <div>
            <Button type='primary' icon='mail'>
              Liên hệ nhà tổ chức
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
)
