import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Carousel, Icon, Card, Button } from 'antd'
import TweenOne from 'rc-tween-one'

import { client } from '@client'
import { event } from '@gqlQueries'

const { Meta } = Card

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
            <Carousel autoplay>
              {events && events.map((item, i) => (
                <div key={i.toString()}>
                  <Card
                    // hoverable
                    style={{ width: 410 }}
                    cover={<img alt='event thumbnail' src={item.images.thumbnail} />}
                  >
                    <Meta
                      title={item.title}
                      description={
                        <Button>
                          <Icon type='info-circle' theme='twoTone' twoToneColor='#91bbff' />
                          More information
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

export default CarouselSection
