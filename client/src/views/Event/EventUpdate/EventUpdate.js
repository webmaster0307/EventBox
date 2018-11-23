import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { client } from '@client'
import gql from 'graphql-tag'
import { Form, Input, Button, Icon, message } from 'antd'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js'
import { formItemLayout, formRuleNotEmpty } from './constants'

const FormItem = Form.Item

const getEventDetail = gql`
  query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      description
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

class EventUpdate extends Component{

  state = {
    loading: true,
    editorState: EditorState.createEmpty()
  }

  componentDidMount = async () => {
    const { eventId } = this.props.match.params
    let result 
    try {
      result = await client.query({query: getEventDetail, variables: { eventId }})
    } catch (error) {
      return message.error('Failed to fetch event')
    }
    const { event } = result.data
    const { form } = this.props
    form.setFieldsValue({
      title: event.title
    })
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.event.description)))
    })
  }

  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        // console.log('values: ',values)
      }
      console.log('editor: ' ,JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  formFields = () => {

    return([
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
        customRender: <Input />,
        rules: [formRuleNotEmpty]
      }
    ])
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { editorState } = this.state

    return (
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
          <EditorWysiwyg
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorStyle={{border: '1px #E6E6E6 solid'}}
            name='editor'
            editorState={editorState} 
            onEditorStateChange={this.onEditorStateChange}
          />
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            block
            htmlType='submit'
          >
            <Icon type='form' />
            Update Event
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(withRouter(EventUpdate))