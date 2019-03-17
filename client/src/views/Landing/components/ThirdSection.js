import React, { Component, createElement } from 'react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, Tag, message } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { withTranslation } from 'react-i18next'
import { Query } from 'react-apollo'
import { event } from '@gqlQueries'

import entertainmentIcon from '../images/section3/Entertainment.png'
import learningIcon from '../images/section3/Studying.png'
import othersIcon from '../images/section3/Other.png'

class ThirdSection extends Component {
  title = () => [{ name: 'title', text: '3rd-title' }, { name: 'content', text: '3rd-subtitle' }]
  block = ({ entertainment, learning, others }) => {
    const { i18n } = this.props
    return [
      {
        icon: entertainmentIcon,
        title: i18n.t('Entertainment'),
        content: (
          <Tag color='green'>
            <span className='none-user-select'>
              {entertainment} {i18n.t('events')}
            </span>
          </Tag>
        )
      },
      {
        icon: learningIcon,
        title: i18n.t('Studying'),
        content: (
          <Tag color='green'>
            <span className='none-user-select'>
              {learning} {i18n.t('events')}
            </span>
          </Tag>
        )
      },
      {
        icon: othersIcon,
        title: i18n.t('Others'),
        content: (
          <Tag color='green'>
            <span className='none-user-select'>
              {others} {i18n.t('events')}
            </span>
          </Tag>
        )
      }
    ]
  }
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100

  render() {
    const { i18n } = this.props
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
              <Query query={event.COUNT_EVENT_BY_TYPE}>
                {({ loading, error, data: { countEventByType } }) => {
                  if (loading) return 'loading...'
                  if (error) return message.error(error)

                  return this.block(countEventByType).map((item, i) => (
                    <Col key={i.toString()} className='block' md={8} sm={24} xs={24}>
                      <div className='icon'>
                        <img src={item.icon} width='100%' alt='img' className='none-user-select' />
                      </div>
                      <h3 className='content0-title'>
                        <b className='none-user-select'>{item.title}</b>
                      </h3>
                      <div>{item.content}</div>
                    </Col>
                  ))
                }}
              </Query>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default withTranslation()(ThirdSection)
