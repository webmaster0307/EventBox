import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { client } from '@client'
import { Form, Button, message, Spin, BackTop } from 'antd'
import { OriganizationArea, DateHoldingArea, DescriptionArea } from '../common' 
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { event as eventQueries } from '@gqlQueries'
import * as routes from '@routes'

const FormItem = Form.Item


@inject('stores')
@observer
class EventUpdate extends Component{

  state = {
    loading: true
  }
  editor = null

  componentDidMount = async () => {
    const { eventId } = this.props.match.params
    const { form, stores: { event } } = this.props
    event.editorEventCreate = EditorState.createEmpty()
    const { error, event: eventDetail } = await event.getEventById(eventId)
    if(error){
      return message.error(error) 
    }
    form.setFieldsValue({
      title: eventDetail.title,
      thumbnail: eventDetail.images.thumbnail,
      shortDescription: eventDetail.shortDescription,
      organizationName: eventDetail.organizationName,
      organizationLogo: eventDetail.organizationLogo,
      organizationDescription: eventDetail.organizationDescription,
      startTime: moment(parseInt(eventDetail.startTime)),
      endTime: moment(parseInt(eventDetail.endTime)),
      location: eventDetail.location,
      address: eventDetail.address
    })
    this.setState({ loading: false })
    event.editorEventCreate = EditorState.createWithContent(convertFromRaw(JSON.parse(eventDetail.description)))
  }

  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const { eventId } = this.props.match.params
        const { event } = this.props.stores
        const dataSubmit = {
          id: eventId,
          ...values,
          description: JSON.stringify(convertToRaw(event.editorEventCreate.getCurrentContent())),
          startTime: values.startTime._d,
          endTime: values.endTime._d
        }
        this.setState({ buttonLoading: true }, () => {
          client.mutate({ 
            mutation: eventQueries.UPDATE_EVENT_BYID, 
            variables: dataSubmit
          })
            .then( ({data, errors}) => {
              this.setState({ buttonLoading: false })
              if(errors){
                return message.error('Failed to update event')
              }
              message.success('Event updated successfully!')
            })
            .catch( ({graphQLErrors}) => {
              this.setState({ buttonLoading: false })
              const msg = (graphQLErrors && 
                graphQLErrors.map(err => err.message).join(', ')) || 'Failed to update event'
              return message.error(msg)
            })
        })
      }
    })
  }

  handlePublishEvent = async () => {
    const { eventId } = this.props.match.params
    let result
    try {
      result = await client.mutate({
        mutation: eventQueries.PUBLISH_EVENT_BYID,
        variables: { id: eventId }
      })
    } catch ({graphQLErrors}) {
      const msg = (graphQLErrors && 
        graphQLErrors.map(err => err.message).join(', ')) || 'Failed to update event'
      return message.error(msg)
    }
    const { data: { publishEvent } } = result
    if(publishEvent){
      // console.log('result: ',result)
      message.success('Xuất bản sự kiện thành công')
      this.props.history.push(`${routes.DASHBOARD}/events`)
    }
  }

  render() {
    const { loading, buttonLoading } = this.state
    const { event } = this.props.stores.event

    return (
      <Spin spinning={loading} >
        <Form onSubmit={this._handleCreatedEvent} hideRequiredMark >
          <DescriptionArea {...this.props} loading={loading} updateStage />
          <OriganizationArea {...this.props} />
          <DateHoldingArea {...this.props} />
          <FormItem>
            <Button
              type='primary'
              htmlType='submit'
              loading={buttonLoading}
              icon='form'
              style={{marginRight: 24}}
            >
              Update Event
            </Button>
            <Button
              type='primary'
              loading={buttonLoading}
              icon='form'
              onClick={this.handlePublishEvent}
              disabled={event && event.status === 'in-review'}
            >
              PUBLISH
            </Button>
          </FormItem>
        </Form>
        <BackTop />
      </Spin>
    )
  }
}

export default Form.create()(withRouter(EventUpdate))