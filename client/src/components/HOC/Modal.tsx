import React, { Component, Fragment } from 'react'
import { Modal } from 'antd'

const DefaultBody = () => <div>Body</div>

const DEFAULT_STATE = {
  visible: false,
  title: 'New Modal',
  destroyOnClose: true,
  body: <DefaultBody />,
  footer: null
}

const ModalHOCWrapper = (Child: React.ComponentType<any>) => {
  class ModalHOC extends Component{
    state = {
      ...DEFAULT_STATE
    }

    _showModal = ( state: any, callback: void ) => {
      this.setState({ visible: true, ...state })
    }

    handleCancel = () => {
      this.setState({visible: false})
    }

    modal = {
      show: this._showModal,
      close: this.handleCancel
    }

    render() {
      const { body, ...rest } = this.state
      return (
        <Fragment>
          <Child {...this.props} modal={this.modal} /> 
          <Modal
            {...rest}
            onCancel={this.handleCancel}
          >
            {body}
          </Modal>
        </Fragment>
      )
    }
  }

  return ModalHOC as any
}

export default ModalHOCWrapper 