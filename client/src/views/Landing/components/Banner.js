import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'

import LogoBlur from './LogoBlur'
import { translate } from 'react-i18next'

@inject('stores')
@observer
class Banner extends Component {
  render () {
    const { isMobile } = this.props.stores.landing
    const { i18n } = this.props
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
            { isMobile ? null : <LogoBlur />}
            <span className='banner0-text'>{i18n.t('banner title')}</span>
          </div>
          <div className='banner0-content' key='content'>
            <span className='banner0-text'>{i18n.t('banner content')}</span>
          </div>
          <Button className='banner0-button' key='button' ghost>
            {i18n.t('see more')}
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

export default translate('translations')(Banner)
