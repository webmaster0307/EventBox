import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TweenOne from 'rc-tween-one'
import ticker from 'rc-tween-one/lib/ticker'

import logo from '../images/logoblur.svg'

class LogoBlur extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: logo,
      w: 300,
      h: 300,
      pixSize: 40,
      pointSizeMin: 11,
      isVisible: true,

      childNode: [],
      boxAnim: {}
    }
    this.gather = true
    this.interval = true
    this.intervalTime = 30 * 1000
    this.unmounted = false
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this)
    this.createPointData()
  }

  createPointData = () => {
    const { w, h } = this.state
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, w, h)
    canvas.width = w
    canvas.height = h

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h)
      const data = ctx.getImageData(0, 0, w, h).data
      this.setDataToDom(data, w, h)
      // this.dom.removeChild(canvas)
    }
    img.crossOrigin = 'anonymous'
    img.src = this.state.image
    this.setState({
      isVisible: false
    })
  }

  setDataToDom(data, w, h) {
    this.pointArray = []
    const number = this.state.pixSize
    for (let i = 0; i < w; i += number) {
      for (let j = 0; j < h; j += number) {
        if (data[(i + j * w) * 4 + 3] > 150) {
          this.pointArray.push({ x: i, y: j })
        }
      }
    }
    const newChildNode = []
    this.pointArray.forEach((item, i) => {
      const r = Math.random() * this.state.pointSizeMin + this.state.pointSizeMin
      const b = Math.random() * 0.5 + 0.3
      newChildNode.push(
        <TweenOne className='point-wrapper' key={i} style={{ left: item.x, top: item.y }}>
          <TweenOne
            className='point'
            style={{
              width: r,
              height: r,
              opacity: b,
              backgroundColor: `rgb(${Math.round(Math.random() * 75 + 180)},0,0)`
            }}
            animation={{
              y: (Math.random() * 2 - 1) * 10 || 5,
              x: (Math.random() * 2 - 1) * 5 || 2.5,
              delay: Math.random() * 1000,
              repeat: -1,
              duration: 3 * 1000,
              yoyo: true,
              ease: 'easeInOutQuad'
            }}
          />
        </TweenOne>
      )
    })

    this.setState(
      {
        childNode: newChildNode,
        boxAnim: { opacity: 0, type: 'from', duration: 800 }
      },
      () => {
        this.interval = ticker.interval(this.updateTweenData, this.intervalTime)
      }
    )
  }

  onMouseEnter = () => {
    if (!this.gather) {
      this.updateTweenData()
    }
    this.componentWillUnmount()
  }

  updateTweenData = () => {
    if (this.unmounted) {
      // console.log('unmounted LogoBlur \nreturn')
      return
    }
    this.dom = ReactDOM.findDOMNode(this)
    this.sideBox = ReactDOM.findDOMNode(this.sideBoxComp)
    ;((this.gather && this.disperseData) || this.gatherData)()
    this.gather = !this.gather
  }

  disperseData = () => {
    const rect = this.dom.getBoundingClientRect()
    const sideRect = this.sideBox.getBoundingClientRect()
    const sideTop = sideRect.top - rect.top
    const sideLeft = sideRect.left - rect.left
    /* eslint-disable */
    const newChildNode = this.state.childNode.map((item) =>
      React.cloneElement(item, {
        animation: {
          x: Math.random() * rect.width - sideLeft - item.props.style.left,
          y: Math.random() * rect.height - sideTop - item.props.style.top,
          opacity: Math.random() * 0.4 + 0.1,
          scale: Math.random() * 2.4 + 0.1,
          duration: Math.random() * 500 + 500,
          ease: 'easeInOutQuint'
        }
      })
    )

    this.setState({ childNode: newChildNode })
  }

  gatherData = () => {
    const newChildNode = this.state.childNode.map((item) =>
      React.cloneElement(item, {
        animation: {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          delay: Math.random() * 500,
          duration: 800,
          ease: 'easeInOutQuint'
        }
      })
    )

    this.setState({ childNode: newChildNode })
  }

  onMouseLeave = () => {
    if (this.gather) {
      this.updateTweenData()
    }
    this.interval = ticker.interval(this.updateTweenData, this.intervalTime)
  }

  componentWillUnmount() {
    ticker.clear(this.interval)
    this.interval = null
    this.unmounted = true
  }

  render() {
    return (
      <div className='logo-gather-demo-wrapper'>
        {this.state.isVisible && <canvas id='canvas' />}
        <TweenOne
          animation={this.state.boxAnim}
          className='right-side blur'
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={(c) => {
            this.sideBoxComp = c
          }}
        >
          {this.state.childNode}
        </TweenOne>
      </div>
    )
  }
}

export default LogoBlur
