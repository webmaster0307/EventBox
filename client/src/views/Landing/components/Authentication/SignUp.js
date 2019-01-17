import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Divider, Icon, Button } from 'antd'
import SignUpForm from '../../../Authorizing/SignUp/SignUp'
import { translate } from 'react-i18next'

@inject('stores')
@observer
class SignUpModal extends Component {
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
    const { isSigningUp } = this.props.stores.landing
    const { refetch, i18n } = this.props
    return (
      <Modal
        title={null}
        footer={null}
        closable={false}
        destroyOnClose
        visible={isSigningUp}
        bodyStyle={{background: '#f9f9f9'}}
        onCancel={() => this.props.stores.landing.ocSignUpModal('c')}
      >
        <SignUpForm refetch={refetch} />
        <Divider>{i18n.t('divider3')}</Divider>
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
              this.props.stores.landing.ocSignUpModal('c')
              this.props.stores.landing.ocSignInModal('o')
            }}
          >
            {i18n.t('tosignin')}!<Icon type='right' />
          </Button>
        </div>
      </Modal>
    )
  }
}

export default translate('translations')(SignUpModal)
