import React, { Component, createElement } from 'react'
import { inject, observer } from 'mobx-react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, Tag } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import entertainment from '../images/section3/Entertainment.png'
import studying from '../images/section3/Studying.png'
import other from '../images/section3/Other.png'

@inject('stores')
@observer
class ThirdSection extends Component {
  title = () => [
    { name: 'title', text: 'Browse Events by Category' },
    { name: 'content', text: 'Quick access to your favorite event category' }
  ]

  block = () => {
    // const { eventList } = this.props.stores.landing
    return [
      {
        key: '0',
        icon: entertainment,
        title: 'Entertainment',
        content: <Tag color='green'>{}</Tag>
      },
      {
        key: '1',
        icon: studying,
        title: 'Studying',
        content: <Tag color='green'>{}</Tag>
      },
      {
        key: '2',
        icon: other,
        title: 'Others',
        content: <Tag color='green'>{}</Tag>
      }
    ]
  }

  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100

  render () {
    const childrenToRender = this.block().map((item, i) => {
      return (
        <Col
          key={i.toString()} className='block'
          md={8} xs={24}
        >
          <div className='icon'>
            <img src={item.icon} width='100%' alt='img' />
          </div>
          <h3 className='content0-title'>{item.title}</h3>
          <div>{item.content}</div>
        </Col>
      )
    })
    return (
      <div className='home-page-wrapper content0-wrapper'>
        <div className='home-page content0'>
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

export default ThirdSection
