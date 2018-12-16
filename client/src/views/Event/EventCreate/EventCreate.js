import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, message, BackTop } from 'antd'
import { client } from '@client'
import gql from 'graphql-tag'
import DescriptionArea from './DescriptionArea'
import OriganizationArea from './OrganizationArea'
import DateHoldingArea from './DateHoldingArea'
import { inject } from 'mobx-react'

const CREATE_EVENT = gql`
  mutation(
    $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,
    $organizationName: String!, $organizationLogo: String!, $organizationDescription: String!,
    $startTime: String!, $endTime: String!, $location: String!
  ) {
    createEvent(
      title: $title, thumbnail: $thumbnail, description: $description, shortDescription: $shortDescription,
      organizationName: $organizationName, organizationLogo: $organizationLogo, 
      organizationDescription: $organizationDescription,
      startTime: $startTime, endTime: $endTime, location: $location
    ) {
      id
      title,
      description,
      createdAt
      user {
        id
        username
      }
    }
  }
`
const FormItem = Form.Item

@inject('stores')
class EventCreate extends Component{

  state = {
    loading: false
  }
  descriptionArea = null

  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        // console.log('values: ' ,values)
        const { event } = this.props.stores
        const dataSubmit = {
          ...values,
          description: event.editorEventCreate,
          startTime: values.startTime._d,
          endTime: values.endTime._d
        }
        this.setState({loading: true}, () => {
          client.mutate({ 
            mutation: CREATE_EVENT, 
            variables: dataSubmit
          })
            .then( ({data, errors}) => {
              this.setState({loading: false})
              if(errors){
                return message.error('Failed to create new event')
              }
              event.editorEventCreate = ''
              message.success('New event created successfully!')
            })
            .catch( () => {
              this.setState({loading: false})
              return message.error('Failed to create new event')
            })
        })
      }
    })
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <Form onSubmit={this._handleCreatedEvent} hideRequiredMark >
          <DescriptionArea {...this.props} />
          <OriganizationArea {...this.props} />
          <DateHoldingArea {...this.props} />
          <FormItem>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              icon='form'
            >
              Create Event
            </Button>
          </FormItem>
        </Form>
        <BackTop />
      </div>
    )
  }
}

export default Form.create()(withRouter(EventCreate))