import React from 'react'
import { Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'

import biglogo from '../../images/biglogo.png'

class Banner extends React.PureComponent {
  render() {
    const { textData } = this.props
    return (
      <div className='banner0'>
        <QueueAnim
          className='banner0-text-wrapper'
          key='QueueAnim'
          type={['bottom', 'top']}
          delay={200}
        >
          <div className='banner0-title' key='title'>
            {
              typeof biglogo === 'string' && biglogo.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
                <img src={biglogo} width='100%' alt='img' />
              ) : (
                biglogo
              )}
          </div>
          <div className='banner0-content' key='content'>
            {textData.banner.introduction}
          </div>
          <Button className='banner0-button' key='button' ghost>
            {textData.banner.button}
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
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
    )
  }
}

export default Banner
