import React, { Component } from 'react'
import { Layout, Avatar, Menu, Dropdown, notification, Icon } from 'antd'
import { client } from '@client'
import { signOut } from '@components'
import { Link, withRouter } from 'react-router-dom'
import { Subscription, Query } from 'react-apollo'
import { event, session } from '@gqlQueries'
import { DB_EVENT_REVIEW } from '@routes'

const { Header } = Layout

class LayoutHeader extends Component {
  render() {
    const { user } = this.props
    const departmentIds = user && user.departments.map((item) => item.id)

    return (
      <Subscription subscription={event.SUBCRIBE_EVENT_REVIEW} variables={{ departmentIds }}>
        {({ data }) => {
          if (data && data.eventSubmited) {
            ShowNotification(data.eventSubmited, this.props)
          }

          return (
            <Header style={{ background: '#fff', padding: '0 16px', textAlign: 'right' }}>
              <UserAvatar />
            </Header>
          )
        }}
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

const actions = (
  <Menu>
    <Menu.Item>
      <span>
        <Link to='/'>Home</Link>
      </span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={() => signOut(client)}>
      <span>Logout</span>
    </Menu.Item>
  </Menu>
)
