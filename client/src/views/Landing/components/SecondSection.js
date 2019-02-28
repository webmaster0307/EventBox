import React, { Component, createElement } from 'react'
import { Row } from 'antd'
import QueueAnim from 'rc-queue-anim'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { translate } from 'react-i18next'
import EventList from './EventList'

class SecondSection extends Component {
  title = () => [
    { key: '0', name: 'title', text: 'Hot Events' },
    {
      key: '1',
      name: 'content',
      text: '2nds-subtitle'
    }
  ]

  render() {
    const { i18n } = this.props
    return (
      <div className='home-page-wrapper content5-wrapper'>
        <div className='home-page content5 jpl17zkbjcf-editor_css'>
          <div key='title' className='title-wrapper'>
            {this.title().map((item) =>
              createElement(
                item.name.indexOf('title') === 0 ? 'h1' : 'div',
                {
                  key: item.key,
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
          <OverPack className={'content-template'} playScale={0.3}>
            <QueueAnim key='u' type='bottom'>
              <Row key='ul' className='content5-img-wrapper' gutter={16}>
                <EventList />
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default translate('translations')(SecondSection)
