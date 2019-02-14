import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import TweenOne from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import logo from '../images/vanlang_logo.png'
import { Row, Col, Icon, Input, Button } from 'antd'
import { translate } from 'react-i18next'

@inject('stores')
@observer
class Footer extends Component {
  block = () => {
    const { i18n } = this.props
    return [
      {
        title: <img width='100%' src={logo} alt='img' />,
        content: (
          <span className='footer-about'>
            <p>
              <b>EventBox</b> {i18n.t('f-about')}
            </p>
            <p>
              <b>{i18n.t('sp-email')}</b>
              <br />
              <Icon type='mail' theme='filled' />
              <span> vlu@vanlanguni.edu.vn</span>
            </p>
          </span>
        )
      },
      {
        title: i18n.t('Address'),
        content: (
          <span className='footer-address'>
            <p>
              <b>{i18n.t('Office')}</b>
              <br />
              <Icon type='environment' theme='filled' />
              <span>
                <i> {i18n.t('office1')}</i>
              </span>
            </p>
            <p>
              <b>{i18n.t('Campus')} 2</b>
              <br />
              <Icon type='environment' />
              <span>
                <i> {i18n.t('office2')}</i>
              </span>
            </p>
            <p>
              <b>{i18n.t('Campus')} 3</b>
              <br />
              <Icon type='environment' />
              <span>
                <i> {i18n.t('office3')}</i>
              </span>
            </p>
          </span>
        )
      },
      {
        title: i18n.t('Contact'),
        content: (
          <span className='footer-contact'>
            <p>
              <b>
                <Icon type='phone' theme='filled' /> {i18n.t('Hotline')}:
              </b>
              <span> {i18n.t('c-time')} </span>
            </p>
            <p className='footer-contact-number'>
              028.3836.7933 <br /> 028.7108.0799
            </p>
          </span>
        )
      },
      {
        title: i18n.t('Quick Access'),
        content: (
          <span className='footer-quickaccess'>
            <p>
              <b>FAQ</b>
              <br />
              <span>
                <i>{i18n.t('faq')}</i>
              </span>
            </p>
            <p>
              <b>{i18n.t('Subscribe us')}</b>
              <Input.Search
                placeholder={i18n.t('sb-inp-ph')}
                onSearch={(value) => console.log(value)}
                enterButton={<Icon type='thunderbolt' />}
              />
            </p>
            <div>
              <b>{i18n.t('Follow us')}</b>
              <br />
              {this.socialButton().map((button, i) => {
                return (
                  <Col
                    key={i.toString()}
                    span={24 / this.socialButton().length}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Button shape='circle' size='large' onClick={button.handleOnClick}>
                      <Icon
                        style={{
                          color: button.color,
                          background: button.bgColor,
                          height: 18,
                          borderRadius: 4
                        }}
                        type={button.iconType}
                        theme={button.theme}
                      />
                    </Button>
                  </Col>
                )
              })}
            </div>
          </span>
        )
      }
    ]
  }

  socialButton = () => [
    {
      handleOnClick: () => {},
      iconType: 'facebook',
      theme: 'filled',
      color: '#3B5998',
      bgColor: ''
    },
    {
      handleOnClick: () => {},
      iconType: 'youtube',
      theme: 'filled',
      color: '#FF0000',
      bgColor: ''
    },
    {
      handleOnClick: () => {},
      iconType: 'twitter',
      theme: '',
      color: '#1DA1F2',
      bgColor: ''
    },
    {
      handleOnClick: () => {},
      iconType: 'instagram',
      theme: '',
      color: '#fff',
      bgColor:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)'
    }
  ]

  render() {
    const childrenToRender = this.block().map((item, i) => {
      return (
        <Col xs={24} md={6} key={i.toString()} className='block' title={null} content={null}>
          <h2 className='logo'>
            {/* eslint-disable */}
            {typeof item.title === 'string' &&
            item.title.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
              <img src={item.title} width='100%' alt='img' />
            ) : (
              item.title
            )}
          </h2>
          <div className='slogan'>{item.content}</div>
        </Col>
      )
    })

    return (
      <div className='home-page-wrapper footer1-wrapper'>
        <OverPack key='x' className='footer1' playScale={0.2}>
          <QueueAnim className='home-page' type='bottom' key='ul' leaveReverse component={Row}>
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            className='copyright-wrapper'
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key='copyright'
          >
            <div key='homepage' className='home-page'>
              <div className='copyright'>
                <p>
                  ©2019 by <span>Team 13</span>. All Rights Reserved
                </p>
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    )
  }
}

export default translate('translations')(Footer)
