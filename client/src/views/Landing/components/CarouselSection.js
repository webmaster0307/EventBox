import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Icon } from 'antd'
import TweenOne from 'rc-tween-one'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { client } from '@client'
import { event } from '@gqlQueries'

@inject('stores')
@observer
class CarouselSection extends Component {
  state = {
    events: []
  }

  componentDidMount = async () => {
    const { data: { events } } = await client.query({
      query: event.GET_PAGINATED_EVENTS_WITH_USERS,
      variables: {status: 'draft', limit: 5}
    })
    this.setState({ events: events.edges })
  }

  render () {
    const { events } = this.state
    return (
      <div className='banner0' style={{height: 560}}>
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
            <Carousel
              showArrows
              showStatus={false}
              showIndicators
              autoPlay
              interval={3000}
              infiniteLoop
              centerMode
              showThumbs={false}
            >
              {events && events.map((item, i) => (
                <div
                  key={i.toString()}
                  style={{
                    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)'
                  }}
                >
                  <img style={{width: 520}} alt='event thumbnail' src={item.images.thumbnail} />
                  <p className='legend'>{item.title}</p>
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

export default CarouselSection
