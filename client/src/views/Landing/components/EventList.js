import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Col } from 'antd'
import { withRouter } from 'react-router-dom'
import * as routes from '@routes'
import moment from 'moment'
import 'moment/locale/vi'
import { withTranslation } from 'react-i18next'

@withRouter
@withTranslation()
@inject('stores')
@observer
class EventList extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { language } = prevProps.i18n
    switch (language) {
      case 'en':
        moment.locale('en')
        break
      case 'vn':
        moment.locale('vi')
        break
      default:
        moment.locale('en')
        break
    }
    // console.log('language: ', language)
  }

  handleGoToEventDetail = (event) => {
    this.props.history.push(`${routes.EVENT}/${event.slug}-${event.id}`)
  }

  render() {
    const events = this.props.stores.landing.eventList || []
    // console.log(events)
    const time = moment(events.startTime)

    return (
      <div>
        {events &&
          events.map((item, index) => (
            <Col
              xs={24}
              lg={12}
              sm={24}
              md={12}
              key={index.toString()}
              className='block'
              onClick={() => this.handleGoToEventDetail(item)}
            >
              <div className='content5-block-content'>
                <div className='coverEvent'>
                  <img src={item.images.thumbnail} alt='img' />
                </div>
                <div className='info'>
                  <div className='nameTitle'>
                    <p>
                      {item.title.length > 63
                        ? item.title.substring(0, 60).concat('...')
                        : item.title}
                    </p>
                  </div>
                  <div className='categoRies' />
                  <div style={{ paddingTop: 10 }}>
                    <div className='fake-calendar'>
                      <div className='month'>{time.format('MMMM')}</div>
                      <div className='date'>{time.format('DD')}</div>
                      <div className='weekDate'>{time.format('dddd')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            // <div
            //   key={index.toString()}
            //   className='block'
            //   onClick={() => this.handleGoToEventDetail(item)}
            // >
            //   <Col xs={24} md={12}>
            //     <div className='content5-block-content'>
            //       <div>
            //         <img src={item.images.thumbnail} width='100%' alt='img' />
            //       </div>
            //       <p>
            // {item.title.length > 63
            //   ? item.title.substring(0, 60).concat('...')
            //   : item.title}
            //       </p>
            //     </div>
            //   </Col>
            // </Card>
          ))}
      </div>
    )
  }
}

export default EventList
