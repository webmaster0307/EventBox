import React, { Component } from 'react'
import { Layout, Avatar, Menu, Dropdown, notification, Icon, Row } from 'antd'
import { client } from '@client'
import { signOut } from '@components'
import { Link, withRouter } from 'react-router-dom'
import { Subscription, Query } from 'react-apollo'
import { event, session } from '@gqlQueries'
import { DB_EVENT_REVIEW } from '@routes'
import { withTranslation } from 'react-i18next'

const { Header } = Layout
const languages = [
  {
    title: 'English',
    lang_id: 'en',
    flag:
      'https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_173/v1547734591/gb_flag.png'
  },
  {
    title: 'Tiếng Việt',
    lang_id: 'vn',
    flag:
      'https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_173/v1547734591/vn_flag.png'
  }
]

class LayoutHeader extends Component {
  render() {
    const { user } = this.props
    const departmentIds = user && user.departments.map((item) => item.id)

    return (
      <Subscription
        subscription={event.SUBCRIBE_EVENT_REVIEW}
        variables={{ departmentIds }}
        onSubscriptionData={({ subscriptionData: { data } }) => {
          const { eventSubmited } = data
          if (eventSubmited) {
            ShowNotification(eventSubmited, this.props)
          }
        }}
      >
        {() => (
          <Header style={{ background: '#fff', padding: '0 16px', textAlign: 'right' }}>
            <UserAvatar />
          </Header>
        )}
      </Subscription>
    )
  }
}
export default withRouter(LayoutHeader)

const ShowNotification = (event, router) =>
  notification.open({
    message: 'New pending Event',
    description: (
      <div>
        New event is waiting for approval.
        <div style={{ fontStyle: 'italic', color: '#404142' }}>{event.title}</div>
        <div
          className='fake-link'
          onClick={() => router.history.push(`${DB_EVENT_REVIEW}/${event.id}`)}
        >
          Review now!
        </div>
      </div>
    ),
    icon: <Icon type='solution' style={{ color: '#108ee9' }} />
  })

class UserAvatar extends Component {
  render() {
    return (
      <Query query={session.GET_LOCAL_SESSION}>
        {({ data }) => (
          <div className='layout-header-useravatar__wrapper'>
            <span style={{ marginRight: 12 }}>{data.me && data.me.username}</span>
            <Dropdown overlay={actions} placement='bottomCenter' trigger={['click']}>
              <Avatar size='large' src={data.me && data.me.photo} style={{ cursor: 'pointer' }} />
            </Dropdown>
          </div>
        )}
      </Query>
    )
  }
}

const Languages = withTranslation()(
  ({ i18n, tReady, t, ...rest }) =>
    languages.map((item) => (
      <Menu.Item key={item.lang_id} {...rest}>
        <span onClick={() => i18n.changeLanguage(item.lang_id)}>
          <Row type='flex' align='middle' style={{ minWidth: 104 }}>
            <div style={{ marginRight: 6 }}>
              <img src={item.flag} style={{ width: 25 }} alt={item.lang_id} />
            </div>
            <div style={{ fontWeight: `${i18n.language === item.lang_id ? 600 : 500}` }}>
              {item.title}
            </div>
          </Row>
        </span>
      </Menu.Item>
    ))
  /* eslint-disable */
)

const actions = (
  <Menu>
    <Menu.Item>
      <div>
        <Link to='/' style={{ display: 'block' }}>
          Home
        </Link>
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Languages />
    <Menu.Divider />
    <Menu.Item onClick={() => signOut(client)}>
      <div style={{ display: 'block' }}>Logout</div>
    </Menu.Item>
  </Menu>
)
