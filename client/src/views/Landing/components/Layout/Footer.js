import React from 'react'
import TweenOne from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import { Row, Col } from 'antd'

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer1'
  }

  render() {
    const { footer } = this.props.textData

    const childrenToRender = footer.block.map((item, i) => {
      return (
        <Col
          xs={24}
          md={6}
          className='block'
          key={i.toString()}
          title={null}
          content={null}
        >
          <h2 className='logo'>
            {typeof item.title === 'string' && item.title.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
              ? <img src={item.title} width='100%' alt='img'/> : item.title
            }
          </h2>
          <div className='slogan'>{item.content}</div>
        </Col>
      )
    })

    return (
      <div className='home-page-wrapper footer1-wrapper'>
        <OverPack className='footer1' playScale={0.2}>
          <QueueAnim
            className='home-page'
            type='bottom'
            key='ul'
            leaveReverse
            component={Row}
          >
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            className='copyright-wrapper'
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key='copyright'
          >
            <div className='home-page'>
              <div className='copyright'>
                {footer.copyright}
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    )
  }
}

export default Footer
