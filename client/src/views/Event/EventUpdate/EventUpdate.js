import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { client } from '@client'
import gql from 'graphql-tag'
import { Form, Button, Icon, message, Spin, BackTop } from 'antd'
import DescriptionArea from './DescriptionArea'
import { OriganizationArea, DateHoldingArea } from '../common' 
import { inject, observer } from 'mobx-react'
import moment from 'moment'

const FormItem = Form.Item

const updateEvent = gql`
  mutation(
    $id: ID!, $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,
    $organizationName: String!, $organizationLogo: String!, $organizationDescription: String!,
    $startTime: String!, $endTime: String!, $location: String!
  ) {
    updateEvent(
      id: $id, title: $title, thumbnail: $thumbnail, 
      description: $description, shortDescription: $shortDescription
      organizationName: $organizationName, organizationLogo: $organizationLogo, 
      organizationDescription: $organizationDescription,
      startTime: $startTime, endTime: $endTime, location: $location
    ) {
      title
      description
      shortDescription
      images {
        thumbnail
      }
      createdAt
      user {
        id
        username
        email
      }
    }
  }
`

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
      location: eventDetail.location
    })
    this.setState({ loading: false })
    event.editorEventCreate = eventDetail.description
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
          description: event.editorEventCreate,
          startTime: values.startTime._d,
          endTime: values.endTime._d
        }
        this.setState({ buttonLoading: true }, () => {
          client.mutate({ 
            mutation: updateEvent, 
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

  render() {
    const { loading, buttonLoading } = this.state

    return (
      <Spin spinning={loading} >
        <Form onSubmit={this._handleCreatedEvent} hideRequiredMark >
          <DescriptionArea {...this.props} loading={loading} />
          <OriganizationArea {...this.props} />
          <DateHoldingArea {...this.props} />
          <FormItem>
            <Button
              type='primary'
              block
              htmlType='submit'
              loading={buttonLoading}
            >
              <Icon type='form' />
              Update Event
            </Button>
          </FormItem>
        </Form>
        <BackTop />
      </Spin>
    )
  }
}

export default Form.create()(withRouter(EventUpdate))