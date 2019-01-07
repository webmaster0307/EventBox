import React, { Component, createElement } from 'react'
import { inject, observer } from 'mobx-react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Row, Col } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'

@inject('stores')
@observer
class ThirdSection extends Component {
  title = () => [
    { name: 'title', text: 'Ant Financial Cloud provides professional services' },
    { name: 'content', text: 'Based on Alibaba Cloud\'s powerful basic resources' }
  ]

  block = () => [
    {
      icon: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
      title: 'Enterprise resource management',
      content: 'Cloud resources are centrally choreographed, elastically scalable.'
    },
    {
      icon: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
      title: 'Cloud security',
      content: 'The complete cloud security system built according to the security.'
    },
    {
      icon: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
      title: 'Cloud monitoring' ,
      content: 'Centralized monitoring of distributed cloud environments.'
    },
    {
      icon: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
      title: 'Mobile',
      content:  'One-stop mobile financial APP development and comprehensive monitorin.'
    },
    {
      icon: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
      title: 'Distributed middleware' ,
      content: 'Financial-grade online transaction processing middleware,.'
    },
    {
      icon: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
      title: 'Big Data',
      content: 'One-stop, full-cycle big data collaborative work platform.'
    }
  ]

  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100

  render () {
    const { isMobile } = this.props.stores.landing

    let clearFloatNum = 0

    const childrenToRender = this.block().map((item, i) => {
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
            {this.title().map((item, i) =>
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
