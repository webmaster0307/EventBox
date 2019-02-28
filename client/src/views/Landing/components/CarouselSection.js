import React, { Component } from 'react'
import { Carousel, Icon, Card, Button, message } from 'antd'
import TweenOne from 'rc-tween-one'
import { translate } from 'react-i18next'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { EVENT } from '@routes'
import { event } from '@gqlQueries'

@withRouter
class CarouselSection extends Component {
  handleGoToEventDetail = (event) => {
    this.props.history.push(`${EVENT}/${event.slug}-${event.id}`)
  }

  render() {
    const { i18n } = this.props
    return (
      <div className='banner0' style={{ height: 560 }} name='carousel'>
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
            <Query
              query={event.GET_EVENTS_HOMEPAGE}
              fetchPolicy='network-only'
            >
              {({ loading, error, data: { eventsHome } }) => {
                if (loading) return 'Loading...'
                if (error) return message.error(error)
                eventsHome = eventsHome.slice(0, 5)
                return (
                  <Carousel autoplay>
                    {eventsHome &&
                      eventsHome.map((item, i) => (
                        <div key={i.toString()}>
                          <Card
                            style={{
                              width: 410,
                              height: 400,
                              borderRadius: 10,
                              background:
                                'linear-gradient(to top right,' +
                                'rgba(255, 245, 255, .9),' +
                                'rgba(255, 253, 240, .7))',
                              border: '4px double black',
                              padding: 2
                            }}
                            cover={
                              <img
                                className='custom-carousel-image'
                                alt='Event thumbnail'
                                src={item.images.thumbnail}
                              />
                            }
                          >
                            <Card.Meta
                              title={
                                <span style={{
                                  fontSize: 19,
                                  fontFamily: 'Monsterat',
                                  borderRadius: 4,
                                  background: 'rgba(255, 255, 255, .8)',
                                  color: '#618692',
                                  padding: 4,
                                  userSelect: 'none'
                                }}>
                                  <Icon type='tag' theme='twoTone' twoToneColor='#52c41a' />
                                  <i>
                                    {item.title.length > 30
                                      ? ` ${item.title.substring(0, 28)}...`
                                      : ` ${item.title}`}
                                  </i>
                                </span>
                              }
                              description={
                                <Button ghost onClick={() => this.handleGoToEventDetail(item)}>
                                  <Icon type='info-circle' theme='twoTone' twoToneColor='#91bbff' />
                                  {i18n.t('More information')}
                                </Button>
                              }
                            />
                          </Card>
                        </div>
                      ))
                    }
                  </Carousel>
                )
              }}
            </Query>
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
