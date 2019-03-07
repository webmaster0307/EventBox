import React, { Component } from 'react'
import { Icon, Button, message } from 'antd'
import TweenOne from 'rc-tween-one'
import { withTranslation } from 'react-i18next'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { EVENT } from '@routes'
import { event } from '@gqlQueries'

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

@withRouter
class CarouselSection extends Component {
  handleGoToEventDetail = (event) => {
    this.props.history.push(`${EVENT}/${event.slug}-${event.id}`)
  }

  handleOnDragStart = e => e.preventDefault()

  render() {
    const { i18n } = this.props
    return (
      <div className='carousel__custom' name='carousel'>
        <div className='carousel__custom-text-wrapper'>
          <div className='carousel__custom-title'>
            <TweenOne
              animation={{
                y: '-=10',
                yoyo: true,
                repeat: -1,
                duration: 1000
              }}
              className='carousel__custom-icon'
            >
              <Icon type='down' />
            </TweenOne>
          </div>
          <div className='carousel__custom-content'>
            <Query query={event.GET_EVENTS_HOMEPAGE} fetchPolicy='network-only'>
              {({ loading, error, data: { eventsHome } }) => {
                if (loading) return 'Loading...'
                if (error) return message.error(error)
                eventsHome = eventsHome.slice(0, 5)
                return (
                  <AliceCarousel
                    buttonsDisabled
                    autoPlay
                    autoPlayInterval={5000}
                    duration={750}
                    fadeOutAnimation
                    stopAutoPlayOnHover
                  >
                    {eventsHome &&
                      eventsHome.map((item, i) => (
                        <div className='flip-box' key={i.toString()}>
                          <div className='flip-box-inner'>
                            <div className='flip-box-front'>
                              <img
                                className='flip-box-front-image'
                                alt='Event thumbnail'
                                src={item.images.thumbnail}
                              />
                            </div>
                            <div className='flip-box-back'>
                              <h2 className='flip-box-back-title'>
                                <Icon type='compass' theme='twoTone' twoToneColor='#5cba1d' />
                                {` ${item.title}`}
                              </h2>
                              <Button ghost onClick={() => this.handleGoToEventDetail(item)}>
                                <Icon type='info-circle' theme='twoTone' twoToneColor='#91bbff' />
                                {i18n.t('More information')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </AliceCarousel>
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
          className='carousel__custom-icon'
        >
          <Icon type='up' />
        </TweenOne>
      </div>
    )
  }
}

export default withTranslation('translations')(CarouselSection)
