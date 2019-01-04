import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, message, BackTop } from 'antd'
import { client } from '@client'
import { DescriptionArea, OriganizationArea, DateHoldingArea } from '../common' 
import { EditorState, convertToRaw } from 'draft-js'
import { inject } from 'mobx-react'
import { event as eventQueries } from '@gqlQueries'
import * as routes from '@routes'

const FormItem = Form.Item

@inject('stores')
class EventCreate extends Component{

  state = {
    loading: false
  }

  componentDidMount = () => {
    this.props.stores.event.editorEventCreate = EditorState.createEmpty()
  }
  
  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const dataSubmit = this.prepareData(values)
        this.setState({loading: true}, () => {
          client.mutate({ 
            mutation: eventQueries.CREATE_EVENT, 
            variables: dataSubmit
          })
            .then( ({data, errors}) => {
              this.setState({loading: false})
              if(errors){
                return message.error('Failed to create new event')
              }
              event.editorEventCreate = EditorState.createEmpty()
              message.success('New event created successfully!')
              this.props.history.push(`${routes.DASHBOARD}/events`)
            })
            .catch( () => {
              this.setState({loading: false})
              return message.error('Failed to create new event')
            })
        })
      }
    })
  }

  handlePublishEvent = () => {
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const dataSubmit = this.prepareData(values)
        const { event } = this.props.stores
        this.setState({loading: true}, () => {
          client.mutate({ 
            mutation: eventQueries.CREATE_EVENT, 
            variables: dataSubmit
          })
            .then( ({data, errors}) => {
              this.setState({loading: false})
              if(errors){
                return message.error('Failed to publish new event')
              }
              event.editorEventCreate = EditorState.createEmpty()
              message.success('New event published successfully!')
            })
            .catch( () => {
              this.setState({loading: false})
              return message.error('Failed to publish new event')
            })
        })
      }
    })
  }

  prepareData = (values) => {
    // console.log('values: ' ,values)
    const { event } = this.props.stores
    const dataSubmit = {
      ...values,
      description: JSON.stringify(convertToRaw(event.editorEventCreate.getCurrentContent())),
      startTime: values.startTime._d,
      endTime: values.endTime._d
    }
    return dataSubmit
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
              style={{marginRight: 24}}
            >
              SAVE
            </Button>
            <Button
              type='primary'
              loading={loading}
              icon='form'
              onClick={this.handlePublishEvent}
            >
              PUBLISH
            </Button>
          </FormItem>
        </Form>
        <BackTop />
      </div>
    )
  }
}

export default Form.create()(withRouter(EventCreate))