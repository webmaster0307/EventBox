import React, { Component } from 'react'
import { Row, Col, Avatar, Switch, Divider } from 'antd'
import { withTranslation } from 'react-i18next'

class BasicSettings extends Component {
  changeLanguage(checked) {
    const { i18n } = this.props
    if (checked) {
      i18n.changeLanguage('vn')
    } else {
      i18n.changeLanguage('en')
    }
  }

  render() {
    const { i18n } = this.props
    return (
      <div>
        <Divider>General settings</Divider>
        <Row>
          <Col lg={2}>
            <Avatar shape='square' size={48} icon='gitlab' />
          </Col>
          <Col lg={18}>
            <b style={{ fontSize: 18, marginBottom: 0 }}>Current language</b>
            <p style={{ fontSize: 14, marginBottom: 0, color: 'green' }}>
              {i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
            </p>
          </Col>
          <Col
            lg={4}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Switch
              size='default'
              checkedChildren='Tiếng Việt'
              unCheckedChildren='English'
              defaultChecked={i18n.language === 'vn'}
              onChange={this.changeLanguage.bind(this)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withTranslation()(BasicSettings)
