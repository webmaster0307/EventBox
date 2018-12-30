import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import TweenOne from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import { Row, Col } from 'antd'

@inject('stores')
@observer
class Footer extends Component {
  block = () => [
    {
      title: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
      content: 'Animation specification and components of Ant Design.'
    },
    {
      title: 'Products',
      content: (
        <span>
          <p><span href="#">Product update record</span></p>
          <p><span href="#">API documentation</span></p>
          <p><span href="#">Quick start</span></p>
          <p><span href="#">Reference guide</span></p>
        </span>
      )
    },
    {
      title: 'Introduction',
      content: (
        <span>
          <p><span href="#">FAQ</span></p>
          <p><span href="#">Contact us</span></p>
        </span>
      )
    },
    {
      title: 'Resources',
      content: (
        <span>
          <p><span href="#">Ant Design</span></p>
          <p><span href="#">Ant Design</span></p>
          <p><span href="#">Ant Design</span></p>
          <p><span href="#">Ant Design</span></p>
        </span>
      )
    }
  ]

  render () {
    const childrenToRender = this.block().map((item, i) => {
      return (
        <Col
          xs={24}
          md={6}
          key={i.toString()}
          className='block'
          title={null}
          content={null}
        >
          <h2 className='logo'>
            {typeof item.title === 'string'
            && item.title.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
              ? <img src={item.title} width='100%' alt='img'/> : item.title
            }
          </h2>
          <div className='slogan'>{item.content}</div>
        </Col>
      )
    })

    return (
      <div className='home-page-wrapper footer1-wrapper'>
        <OverPack key='x' className='footer1' playScale={0.2}>
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
            <div key='homepage' className='home-page'>
              <div className='copyright'>
                <span>
                  ©2018 by <a href='https://ant.design'>Ant Motion</a> All Rights Reserved
                </span>
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    )
  }
}

export default Footer
