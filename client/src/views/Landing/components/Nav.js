import React from 'react'
import { inject, observer } from 'mobx-react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom'
import TweenOne from 'rc-tween-one'
import { Menu, Affix, Button, Icon } from 'antd'

import logo from '../images/logo.svg'
import { Query, ApolloConsumer } from 'react-apollo'
import { signOut } from '@components'
import { GET_SESSION } from '../../Authorizing/Session/localQueries'

const { Item, SubMenu } = Menu

@inject('stores')
@observer
class Header extends React.Component {

  phoneClick = () => {
    const menu = findDOMNode(this.menu)
    this.props.stores.landing.handlePhoneClick(menu.scrollHeight)
  }

  handleSignOut = () => {
    
  }

  render() {

    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_SESSION}>
            {({data, error}) => {
              // apollo local state
              const { me } = data
              // console.log('me: ',me)
              const {
                isMobile, currentLangData, buttonText, phoneOpen, menuHeight
              } = this.props.stores.landing
          
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
                navChildren.push(<SubMenu className="user" title={userTitle} key="user">
                  <Item key="a"><Link to='/dashboard' >Dashboard</Link></Item>
                  {/* <Item key="b">修改密码</Item> */}
                  <Item key="c" onClick={() => signOut(client)} >Sign Out</Item>
                </SubMenu>)
              }
              else{
                navChildren = currentLangData.navigationItems.map((item, i) => (
                  <Item key={i.toString()}>
                    <Link to={item.path}>
                      <span>
                        <Icon type={item.iconType} style={{
                          border: '1px solid',
                          borderRadius: 2
                        }}/>{`${item.text}`}
                      </span>
                    </Link>
                  </Item>
                ))
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
                      {isMobile && (
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
                          // defaultSelectedKeys={['0']}
                          theme={isMobile ? 'dark' : 'light'}
                        >
                          {navChildren}
                          <Item>
                            <Button
                              type='primary'
                              onClick={() => {
                                this.props.stores.landing.changeLanguage()
                              }}
                            >
                              {buttonText}
                            </Button>
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
