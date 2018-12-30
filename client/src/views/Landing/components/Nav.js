import React from 'react'
import { inject, observer } from 'mobx-react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom'
import TweenOne from 'rc-tween-one'
import { Menu, Affix, Icon } from 'antd'

import logo from '../images/vanlang_logo.png'
import { Query, ApolloConsumer } from 'react-apollo'
import { signOut } from '@components'
import { GET_SESSION } from '../../Authorizing/Session/localQueries'

const { Item, SubMenu } = Menu

@inject('stores')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneOpen: false,
      menuHeight: 0
    }
  }

  phoneClick = () => {
    const menu = findDOMNode(this.menu)
    const phoneOpen = !this.state.phoneOpen
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? menu.scrollHeight : 0
    })
  }

  handleSignOut = () => {

  }

  handleMenuClick = ({ key }) => {
    switch (key) {
      case 'signin':
        this.props.stores.landing.ocSignInModal('o')
        break
      case 'signup':
        this.props.stores.landing.ocSignUpModal('o')
        break
      default:
        this.props.stores.landing.changeLanguage()
    }
  }

  render () {
    const {
      isMobile, buttonText
    } = this.props.stores.landing
    const { menuHeight, phoneOpen } = this.state
    const x = isMobile
    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_SESSION}>
            {({data, error}) => {
              // apollo local state
              const { me } = data

              let navChildren = []
              if(me && !error){
                const userTitle = (
                  <div >
                    <span className="img" >
                      <img
                        src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
                        width="100%"
                        height="100%"
                        alt="img"
                      />
                    </span>
                    <span>{me.username} | {me.email}</span>
                  </div>
                )
                navChildren=[
                  ...navChildren,
                  <SubMenu className="user" title={userTitle} key="user">
                    <Item key="a"><Link to='/dashboard' >Dashboard</Link></Item>
                    {/* <Item key="b">修改密码</Item> */}
                    <Item key="c" onClick={() => signOut(client)} >Sign Out</Item>
                  </SubMenu>
                ]
              }
              else{
                navChildren = [
                  ...navChildren,
                  <Item key='signup' className='menu-item-text-custom'>
                    <Icon
                      className='menu-item-icon-custom'
                      type='user-add'
                    />SIGN UP
                  </Item>,
                  <Item key='signin' className='menu-item-text-custom'>
                    <Icon
                      className='menu-item-icon-custom'
                      type='login'
                    />SIGN IN
                  </Item>
                ]
              }

              return(
                <Affix offsetTop={0}>
                  <TweenOne
                    component='header'
                    animation={{ opacity: 0, type: 'from' }}
                    className='header0 home-page-wrapper'
                  >
                    <div className={`home-page ${phoneOpen ? 'open' : ''}`}>
                      <TweenOne
                        animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
                        className='header0-logo'
                      >
                        <img width="100%" src={logo} alt="img" />
                      </TweenOne>
                      {x && (
                        <div
                          className='header0-mobile-menu'
                          onClick={this.phoneClick}
                        >
                          <em />
                          <em />
                          <em />
                        </div>
                      )}
                      <TweenOne
                        className='header0-menu'
                        animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
                        ref={(c) => { this.menu = c }}
                        style={isMobile ? { height: menuHeight } : null}
                      >
                        <Menu
                          mode={isMobile ? 'inline' : 'horizontal'}
                          theme={isMobile ? 'dark' : 'light'}
                          onClick={this.handleMenuClick}
                        >
                          {navChildren}
                          <Item className='menu-item-text-custom'>
                            <span style={{padding: 3, border: '1px solid'}}>{buttonText}</span>
                          </Item>
                        </Menu>
                      </TweenOne>
                    </div>
                  </TweenOne>
                </Affix>
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default Header
