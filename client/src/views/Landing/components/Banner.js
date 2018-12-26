import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'

import LogoBlur from './LogoBlur'


@inject('stores')
@observer
class Banner extends Component {
  render () {
    const { banner } = this.props.stores.landing.currentLangData
    return (
      <div className='banner0'>
        <QueueAnim
          className='banner0-text-wrapper'
          key='QueueAnim'
          type={['bottom', 'top']}
          delay={200}
        >
          <div className='banner0-title' key='title'>
            {/* {
              typeof biglogo === 'string'
              && biglogo.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
                  <img src={biglogo} width='100%' alt='img' />
                ) : (
                  biglogo
                )} */}
            <LogoBlur />
          </div>
          <div className='banner0-content' key='content'>
            {banner.introduction}
          </div>
          <Button className='banner0-button' key='button' ghost>
            {banner.button}
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className='banner0-icon'
          key='icon'
        >
          <Icon type='down' />
        </TweenOne>
      </div>
    )
  }
}

export default Banner
