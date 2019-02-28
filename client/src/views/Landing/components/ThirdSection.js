import React, { Component, createElement } from 'react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, Tag } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { translate } from 'react-i18next'

import entertainment from '../images/section3/Entertainment.png'
import studying from '../images/section3/Studying.png'
import other from '../images/section3/Other.png'

class ThirdSection extends Component {
  title = () => [{ name: 'title', text: '3rd-title' }, { name: 'content', text: '3rd-subtitle' }]

  block = () => {
    const { i18n } = this.props

    return [
      {
        key: '0',
        icon: entertainment,
        title: i18n.t('Entertainment'),
        content: <Tag color='green'>10 {i18n.t('events')}</Tag>
      },
      {
        key: '1',
        icon: studying,
        title: i18n.t('Studying'),
        content: <Tag color='green'>4 {i18n.t('events')}</Tag>
      },
      {
        key: '2',
        icon: other,
        title: i18n.t('Others'),
        content: <Tag color='green'>8 {i18n.t('events')}</Tag>
      }
    ]
  }

  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100

  render() {
    const { i18n } = this.props
    const childrenToRender = this.block().map((item, i) => {
      return (
        <Col key={i.toString()} className='block' md={8} sm={24} xs={24}>
          <div className='icon'>
            <img src={item.icon} width='100%' alt='img' />
          </div>
          <h3 className='content0-title'>
            <b>{item.title}</b>
          </h3>
          <div>{item.content}</div>
        </Col>
      )
    })
    return (
      <div className='home-page-wrapper content0-wrapper' style={{ minHeight: 485 }}>
        <div className='home-page content0'>
          <div className='title-wrapper'>
            {this.title().map((item, i) =>
              createElement(
                item.name.indexOf('title') === 0 ? 'h1' : 'div',
                {
                  key: i.toString(),
                  className: item.name.indexOf('title') === 0 ? 'title-h1' : 'title-content'
                },
                /* eslint-disable */
                typeof item.text === 'string' &&
                  item.text.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                  ? createElement('img', {
                      src: item.text,
                      alt: 'img'
                    })
                  : i18n.t(item.text)
              )
            )}
          </div>
          <OverPack playScale={0.3} className=''>
            <QueueAnim
              className='block-wrapper'
              type='bottom'
              key='block'
              leaveReverse
              component={Row}
            >
              {childrenToRender}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default translate('translations')(ThirdSection)
