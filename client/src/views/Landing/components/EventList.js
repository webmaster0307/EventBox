import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Card } from 'antd'
import { withRouter } from 'react-router-dom'
import * as routes from '@routes'

@withRouter
@inject('stores')
@observer
class EventList extends Component{

  handleGoToEventDetail = event => {
    this.props.history.push(`${routes.EVENT}/${event.slug}-${event.id}`)
  }

  render(){
    // const { events } = this.state
    const events = this.props.stores.landing.eventList || []
    
    return(
      <Card>
        {events && events.map((item, index) => (
          <Col
            key={index.toString()} className='block'
            md={6} xs={24}
            onClick={() => this.handleGoToEventDetail(item)}
          >
            <div className='content5-block-content'>
              <span>
                <img src={item.images.thumbnail} height='100%' alt='img' />
              </span>
              <p>
                {item.title.length > 63 ?
                  item.title.substring(0, 60).concat('...')
                  :
                  item.title
                }
              </p>
            </div>
          </Col>
        ))
        }
      </Card>
    )
  }
}

export default EventList