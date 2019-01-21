import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { findDOMNode } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import TweenOne from 'rc-tween-one'
import { Menu, Affix, Icon, Row, Avatar } from 'antd'

// import logo from '../images/vanlang_logo.png'
import { Query } from 'react-apollo'
import { signOut } from '@components'
import { session } from '@gqlQueries'

import { translate } from 'react-i18next'

const { Item, SubMenu } = Menu

@withRouter
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
    const { i18n } = this.props
    if (key === 'signin') {
      this.props.stores.landing.ocSignInModal('o')
    } else if (key === 'signup') {
      this.props.stores.landing.ocSignUpModal('o')
    } else if (key === 'vnFlag'){
      i18n.changeLanguage('vn')
      this.props.stores.landing.isEnglish = false
    } else if (key === 'usFlag'){
      i18n.changeLanguage('en')
      this.props.stores.landing.isEnglish = true
    }
  }

  render () {
    const { i18n } = this.props
    const {
      isMobile, isEnglish
    } = this.props.stores.landing
    const { menuHeight, phoneOpen } = this.state
    return (
      <Query query={session.GET_LOCAL_SESSION}>
        {({data, error, client}) => {
          // apollo local state
          const { me } = data

          let navChildren = []
          if(me && !error){
            const userTitle = (
              <div >
                <Avatar
                  size={36}
                  alt='img'
                />
                <span>{me.username} | {me.email}</span>
              </div>
            )
            navChildren=[
              ...navChildren,
              <SubMenu className='user' title={userTitle} key='user'>
                <Item key='a'>
                  <Link to='/dashboard'>
                    {i18n.t('dashboard')}
                  </Link>
                </Item>
                <Item key='c' onClick={() => signOut(client)}>{i18n.t('signout')}</Item>
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
                />{i18n.t('signup')}
              </Item>,
              <Item key='signin' className='menu-item-text-custom'>
                <Icon
                  className='menu-item-icon-custom'
                  type='login'
                />{i18n.t('signin')}
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
                    onClick={() => this.props.history.push('/')}
                  >
                    <img width='100%' src='https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_376/v1547734140/vanlang_logo.png' alt='img' />
                  </TweenOne>
                  {toJS(isMobile) && (
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
                      mode={toJS(isMobile) ? 'horizontal' : 'horizontal'}
                      theme={toJS(isMobile) ? 'dark' : 'light'}
                      onClick={this.handleMenuClick}
                    >
                      {navChildren}
                      {/* <Item className='menu-item-text-custom'>
                        <span style={{padding: 3, border: '1px solid'}}>{buttonText}</span>
                      </Item> */}
                      <SubMenu key='sub1' title={<LanguageSelected isEnglish={isEnglish} />} >
                        <Menu.Item key='vnFlag'>
                          <Row type='flex' align='middle' >
                            <div style={{marginRight: 6}} >
                              <img src='https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_173/v1547734591/vn_flag.png' style={{width: 25}} alt='vietnam_flag' />
                            </div>
                            <div style={{fontWeight: 600}} >
                              Tiếng Việt
                            </div>
                          </Row>
                        </Menu.Item>
                        <Menu.Item key='usFlag'>
                          <Row type='flex' align='middle' >
                            <div style={{marginRight: 6}} >
                              <img src='https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_173/v1547734591/gb_flag.png' style={{width: 25}} alt='england_flag' />
                            </div>
                            <div style={{fontWeight: 600}} >
                              English
                            </div>
                          </Row>
                        </Menu.Item>
                      </SubMenu>
                    </Menu>
                  </TweenOne>
                </div>
              </TweenOne>
            </Affix>
          )
        }}
      </Query>
    )
  }
}

const LanguageSelected = ({ isEnglish }) => (
  isEnglish ?
    <span style={{padding: 3}} >
      <img src='https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_173/v1547734591/gb_flag.png' style={{width: 25, marginRight: 4}} alt='england_flag' />
      <Icon type='caret-down' />
    </span>
    :
    <span>
      <img src='https://res.cloudinary.com/ddfez1a0x/image/upload/c_scale,q_100,w_173/v1547734591/vn_flag.png' style={{width: 25, marginRight: 4}} alt='vietnam_flag' />
      <Icon type='caret-down' />
    </span>
)

export default translate('translations')(Header)
