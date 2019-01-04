import React, { Component } from 'react'
import { Row, Col, Avatar, Switch, Divider } from 'antd'

class BasicSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnglish: true
    }
  }

  changeLanguage () {
    this.setState({
      isEnglish: !this.state.isEnglish
    })
  }

  render() {
    return (
      <div>
        <Divider>General settings</Divider>
        <Row>
          <Col lg={2}>
            <Avatar shape='square' size={48} icon='gitlab'/>
          </Col>
          <Col lg={18}>
            <b style={{ fontSize: 18, marginBottom: 0 }}>Current language</b>
            <p style={{ fontSize: 14, marginBottom: 0, color: 'green' }}>
              {this.state.isEnglish ? 'English' : 'Tiếng Việt'}
            </p>
          </Col>
          <Col lg={4}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Switch
              size='default'
              checkedChildren='English'
              unCheckedChildren='Tiếng Việt'
              defaultChecked
              onChange={this.changeLanguage.bind(this)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default BasicSettings
