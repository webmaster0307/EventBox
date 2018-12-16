import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom'
import TweenOne from 'rc-tween-one'
import { Menu, Affix, Button, Icon } from 'antd'

import logo from '../../images/logo.svg'

const Item = Menu.Item

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

  render() {
    const { isMobile, textData } = this.props
    const { menuHeight, phoneOpen } = this.state

    const navChildren = textData.navigationItems.map((item, i) => (
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

    return (
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
                onClick={() => {this.phoneClick()}}
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
                defaultSelectedKeys={['0']}
                theme={isMobile ? 'dark' : 'light'}
              >
                <Item>
                  <Button
                    type='primary'
                    onClick={() => {
                      this.setState(() => this.props.switch())
                    }}
                  >
                    {this.props.buttonText}
                  </Button>
                </Item>
                {navChildren}
              </Menu>
            </TweenOne>
          </div>
        </TweenOne>
      </Affix>
    )
  }
}

export default Header
