import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Link , Events, scrollSpy, scroller } from 'react-scroll'

import LogoBlur from './LogoBlur'
import { translate } from 'react-i18next'

@inject('stores')
@observer
class Banner extends Component {
  componentDidMount() {
    Events.scrollEvent.register('begin')
    Events.scrollEvent.register('end')
    scrollSpy.update()
  }

  scrollTo() {
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

  componentWillUnmount () {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

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
            {isMobile ? null : <LogoBlur />}
            <span className='banner0-text'>{i18n.t('banner title')}</span>
          </div>
          <div className='banner0-content' key='content'>
            <span className='banner0-text'>{i18n.t('banner content')}</span>
          </div>
          <Link to='carousel' offset={-180} spy smooth duration={600}>
            <Button className='banner0-button' key='button' ghost>
              {i18n.t('see more')}
            </Button>
          </Link>
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
