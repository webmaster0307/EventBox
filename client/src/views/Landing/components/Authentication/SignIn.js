import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Divider, Row, Col, Icon, Button } from 'antd'
import { translate } from 'react-i18next'
import { SignInFormWrapped as SignInForm } from '../../../Authorizing/SignIn/SignIn'

@inject('stores')
@observer
class SignInModal extends Component {
  socialButton = () => [
    {
      handleOnClick: () => {},
      iconType: 'facebook',
      theme: 'filled',
      color: '#3B5998',
      bgColor: ''
    },
    {
      handleOnClick: () => {},
      iconType: 'google',
      theme: '',
      color: '#ED4E1D',
      bgColor: ''
    },
    {
      handleOnClick: () => {},
      iconType: 'twitter',
      theme: '',
      color: '#1DA1F2',
      bgColor: ''
    },
    {
      handleOnClick: () => {},
      iconType: 'instagram',
      theme: '',
      color: '#fff',
      bgColor: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)'
    }
  ]

  render () {
    const { isSigningIn } = this.props.stores.landing
    const { refetch, i18n } = this.props
    return (
      <Modal
        title={null}
        footer={null}
        closable={false}
        destroyOnClose
        visible={isSigningIn}
        bodyStyle={{background: '#f9f9f9'}}
        onCancel={() => this.props.stores.landing.ocSignInModal('c')}
      >
        <SignInForm refetch={refetch} />
        <Divider>{i18n.t('divider1')}</Divider>
        <Row>
          {
            this.socialButton().map((button, i) => {
              return (
                <Col
                  key={i.toString()}
                  span={24 / this.socialButton().length}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Button shape='circle' size='large' onClick={button.handleOnClick}>
                    <Icon
                      style={{
                        color: button.color,
                        background: button.bgColor,
                        height: 18,
                        borderRadius: 4
                      }}
                      type={button.iconType}
                      theme={button.theme}
                    />
                  </Button>
                </Col>
              )
            })
          }
        </Row>
        <Divider>{i18n.t('divider2')}</Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            style={{alignSelf: 'center'}}
            type='primary'
            onClick={() => {
              this.props.stores.landing.ocSignInModal('c')
              this.props.stores.landing.ocSignUpModal('o')
            }}
          >
            {i18n.t('tosignup')}!<Icon type='right' />
          </Button>
        </div>
      </Modal>
    )
  }
}

export default translate('translations')(SignInModal)
