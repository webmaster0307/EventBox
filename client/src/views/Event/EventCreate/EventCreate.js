import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Icon, message, BackTop } from 'antd'
import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { formItemLayout, formRuleNotEmpty } from './constants'
import { client } from '@client'
import gql from 'graphql-tag'

const CREATE_EVENT = gql`
  mutation($title: String!, $thumbnail: String!, $description: String!, $shortDescription: String) {
    createEvent(title: $title, thumbnail: $thumbnail, description: $description, shortDescription: $shortDescription) {
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

class EventCreate extends Component{

  state = {
    loading: false
  }
  editor = null

  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const { title, thumbnail, shortDescription } = values
        this.setState({loading: true}, () => {
          client.mutate({ 
            mutation: CREATE_EVENT, 
            variables: { 
              title, 
              thumbnail,
              shortDescription,
              description: JSON.stringify(convertToRaw(this.editor.state.editorState.getCurrentContent()))
            }
          })
            .then( ({data, errors}) => {
              this.setState({loading: false})
              if(errors){
                return message.error('Failed to create new event')
              }
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

  formFields = () => [
    {
      name: 'title',
      title: 'Title',
      customRender: <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      customRender: <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      customRender: <Input />
    }
  ]

  render() {
    const { loading } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Form onSubmit={this._handleCreatedEvent} hideRequiredMark >
          {this.formFields().map(field => {
            const { name, title, rules, customRender } = field
            return(
              <FormItem
                key={name}
                label={title}
                colon={false}
                {...formItemLayout}
              >
                {getFieldDecorator(name, {
                  rules
                })(customRender)}
              </FormItem>
            )
          })}
          <FormItem
            key='description'
            label='Description'
            colon={false}
            {...formItemLayout}
          >
            <Editor
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorStyle={{border: '1px #E6E6E6 solid'}}
              name='editor'
              ref={editor => {this.editor = editor}}
            />
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              block
              htmlType='submit'
              loading={loading}
            >
              <Icon type='form' />
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