import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Carousel, Icon, Card, Button } from 'antd'
import TweenOne from 'rc-tween-one'
import { translate } from 'react-i18next'

import { withRouter } from 'react-router-dom'
import { EVENT } from '@routes'

const { Meta } = Card

@withRouter
@inject('stores')
@observer
class CarouselSection extends Component {
  state = {
    events: []
  }

  handleGoToEventDetail = (event) => {
    this.props.history.push(`${EVENT}/${event.slug}-${event.id}`)
  }

  render() {
    // const { events } = this.state
    const eventList = this.props.stores.landing.eventList || []
    const events = eventList && eventList.slice(0, 5)
    const { i18n } = this.props
    return (
      <div className='banner0' style={{ height: 560 }}>
        <div className='banner0-text-wrapper'>
          <div className='banner0-title' key='title'>
            <TweenOne
              animation={{
                y: '-=10',
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
          <div key='content'>
            <Carousel autoplay>
              {events &&
                events.map((item, i) => (
                  <div key={i.toString()}>
                    <Card
                      style={{
                        width: 410,
                        height: 400,
                        borderRadius: 10,
                        background:
                          'linear-gradient(to top right,' +
                          'rgba(234, 242, 255, 1),' +
                          'rgba(255, 255, 255, .7))',
                        border: 'none'
                      }}
                    >
                      <img
                        style={{
                          width: '80%',
                          marginBottom: 10,
                          borderRadius: 10
                        }}
                        alt='event thumbnail'
                        src={item.images.thumbnail}
                      />
                      <Meta
                        title={
                          <span style={{ fontSize: 20 }}>
                            <Icon type='tag' theme='twoTone' twoToneColor='#52c41a' />
                            <i>
                              {item.title.length > 30
                                ? ` ${item.title.substring(0, 30)}...`
                                : ` ${item.title}`}
                            </i>
                          </span>
                        }
                        description={
                          <Button onClick={() => this.handleGoToEventDetail(item)}>
                            <Icon type='info-circle' theme='twoTone' twoToneColor='#91bbff' />
                            {i18n.t('More information')}
                          </Button>
                        }
                      />
                    </Card>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
        <TweenOne
          animation={{
            y: '-=10',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className='banner0-icon'
          key='icon'
        >
          <Icon type='up' />
        </TweenOne>
      </div>
    )
  }
}

export default translate('translations')(CarouselSection)
