
import React, { Component } from 'react'
import { client } from '@client'
import { event } from '@gqlQueries'
import { Col, Card } from 'antd'

class EventList extends Component{

  state = {
    events: []
  }

  componentDidMount = async () => {
    const { data: { events } } = await client.query({
      query: event.GET_PAGINATED_EVENTS_WITH_USERS,
      variables: {status: 'draft', limit: 8}
    })
    this.setState({ events: events.edges })
  }

  render(){
    const { events } = this.state
    return(
      <Card>
        {events && events.map((item, index) => (
          <Col
            key={index.toString()} className='block'
            md={6} xs={24}
          >
            <div className='content5-block-content'>
              <span>
                <img src={item.images.thumbnail} height='100%' alt='img' />
              </span>
              <p>{item.title}</p>
            </div>
          </Col>
        ))
        }
      </Card>
    )
  }
}

export default EventList