import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Row, Col, Card, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import * as routes from '@routes'
import moment from 'moment'


import '../eventdetail.scss'

@withRouter
@inject('stores')
@observer
class EventList extends Component {
  handleGoToEventDetail = event => {
    this.props.history.push(`${routes.EVENT}/${event.slug}-${event.id}`)
  }

  render() {
    const events = this.props.stores.landing.eventList || []

    console.log(toJS(events))

    return (
      <Card>
        {events &&
          events.map((item, index) => {
            const time = moment(item.startTime)
            const createdAt = moment(item.createdAt)
            return (
              <Col
                key={index.toString()}
                className='block'
                md={12}
                xs={24}
                onClick={() => this.handleGoToEventDetail(item)}
              >
                <div className='content5-block-content'>
                  <span>
                    <img src={item.images.thumbnail} height='100%' alt='img' />
                  </span>
                  <p style={{ textAlign: 'left', padding: 5, fontWeight: 600 }}>
                    {item.title.length > 63 ? item.title.substring(0, 60).concat('...') : item.title}
                  </p>
                  <Row>
                    <Col span={18}>
                      <p style={{ textAlign: 'left', padding: 5 }}>
                        <Icon type='file-text' /> <b>Ngày tạo:</b> {createdAt.format('LL')}
                      </p>
                      <p style={{ textAlign: 'left', padding: 5 }}>
                        <Icon type='project' /> <b>Danh mục:</b> Sự kiện
                      </p>
                    </Col>
                    <Col span={6}>
                      <div className='calendar-fake'>
                        <div className='month'>{time.format('MMMM')}</div>
                        <div className='date'>{time.format('DD')}</div>
                        <div className='weekdate'>{time.format('dddd')}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            )
          })
        }
      </Card>
    )
  }
}

export default EventList
