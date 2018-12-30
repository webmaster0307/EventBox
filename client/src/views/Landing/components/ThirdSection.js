import React, { Component, createElement } from 'react'
import { inject, observer } from 'mobx-react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Row, Col } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'

@inject('stores')
@observer
class ThirdSection extends Component {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100

  render () {
    const { isMobile, currentLangData } = this.props.stores.landing
    const { thirdSection } = currentLangData

    let clearFloatNum = 0

    const childrenToRender = thirdSection.block.map((item, i) => {
      const delay = isMobile ? i * 50 : this.getDelay(i, 24 / 8)
      const liAnim = {
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad',
        delay
      }
      const childrenAnim = { ...liAnim, x: '+=10', delay: delay + 100 }
      clearFloatNum += 8
      clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum
      return (
        <TweenOne
          component={Col}
          animation={liAnim}
          key={i.toString()}
          componentProps={{ md: 8, xs: 24 }}
          className={
            !clearFloatNum
              ? `${'content3-block' || ''} clear-both`.trim()
              : 'content3-block'
          }
        >
          <TweenOne
            animation={{
              x: '-=10',
              opacity: 0,
              type: 'from',
              ease: 'easeOutQuad'
            }}
            key='img'
            className='content3-icon'
          >
            <img src={item.icon} width='100%' alt='img' />
          </TweenOne>
          <div className='content3-text'>
            <TweenOne
              key='h2'
              animation={childrenAnim}
              component='h2'
              className='content3-title'
            >
              {item.title}
            </TweenOne>
            <TweenOne
              key='p'
              animation={{ ...childrenAnim, delay: delay + 200 }}
              component='div'
              className='content3-content'
            >
              {item.content}
            </TweenOne>
          </div>
        </TweenOne>
      )
    })
    return (
      <div className='home-page-wrapper content3-wrapper'>
        <div className='home-page content3'>
          <div className='title-wrapper'>
            {thirdSection.title.map((item, i) =>
              createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div',
                {
                  key: i.toString(),
                  className: item.name.indexOf('title') === 0 ? 'title-h1' : 'title-content'
                },
                typeof item.text === 'string'
                && item.text.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                  ? createElement('img', {
                    src: item.text,
                    alt: 'img'
                  })
                  : item.text))}
          </div>
          <OverPack playScale={0.3}>
            <QueueAnim key='u' type='bottom'>
              <Row key='row'  className='content3-block-wrapper'>
                {childrenToRender}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default ThirdSection
