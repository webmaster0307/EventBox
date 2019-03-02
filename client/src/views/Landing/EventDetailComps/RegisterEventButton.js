import React from 'react'
import { Mutation } from 'react-apollo'
import { event } from '@gqlQueries'
import { Button, Modal, notification } from 'antd'
import { translate } from 'react-i18next'

// handle logging state before request
const RegisterButton = ({ i18n, eventId }) => {
  return (
    <Mutation
      mutation={event.JOIN_EVENT}
      variables={{ eventId }}
      update={(cache, { data: { joinEvent } }) => {
        if (!joinEvent) {
          return alert('Failed to delete')
        }
        const { code, ticketSvgSrc: svgSource } = joinEvent
        showTicket({ code, svgSource })
      }}
      onError={({ graphQLErrors: [{ message }] }) => {
        showError({ message })
      }}
    >
      {(joinEvent, { data, loading, error }) => (
        <Button type='primary' icon='fire' onClick={() => joinEvent()} loading={loading}>
          {i18n.t('registerEvent')}
        </Button>
      )}
    </Mutation>
  )
}

export default translate('translations')(RegisterButton)

const showError = ({ title = 'Something wrong', message }) => {
  notification.error({
    message: title,
    description: message
  })
  // const modal = Modal.error({
  //   title,
  //   content: message,
  //   maskClosable: true
  // })
  // setTimeout(() => {
  //   modal.destroy()
  // }, 2000)
}

const showTicket = ({ code, svgSource }) => {
  Modal.success({
    title: 'Registered successfully',
    content: (
      <div>
        <div>
          <img src={svgSource} alt='ticket-src' />
        </div>
        <div style={{ padding: '24px 0' }}>Your ticket code: {code}</div>
      </div>
    )
  })
}
