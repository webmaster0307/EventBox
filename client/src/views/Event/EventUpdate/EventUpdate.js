import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { client } from '@client'
import gql from 'graphql-tag'
import { Form, Input, Button, Icon, message, Spin, BackTop } from 'antd'
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
const updateEvent = gql`
  mutation($id: ID!, $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String) {
    updateEvent(
      id: $id, title: $title, thumbnail: $thumbnail, 
      description: $description, shortDescription: $shortDescription
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

class EventUpdate extends Component{

  state = {
    loading: true,
    buttonLoading: false,
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
      title: event.title,
      thumbnail: event.images.thumbnail,
      shortDescription: event.shortDescription
    })
    this.setState({
      loading: false,
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.event.description)))
    })
  }

  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        const { eventId } = this.props.match.params
        const { title, thumbnail, shortDescription } = values
        this.setState({ buttonLoading: true }, () => {
          client.mutate({ 
            mutation: updateEvent, 
            variables: { 
              id: eventId,
              title, 
              thumbnail,
              shortDescription,
              description: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
            }
          })
            .then( ({data, errors}) => {
              this.setState({ buttonLoading: false })
              if(errors){
                return message.error('Failed to create new event')
              }
              message.success('New event created successfully!')
            })
            .catch( ({graphQLErrors}) => {
              this.setState({ buttonLoading: false })
              const msg = (graphQLErrors && 
                graphQLErrors.map(err => err.message).join(', ')) || 'Failed to create new event'
              return message.error(msg)
            })
        })
      }
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
        customRender: <Input />
      }
    ])
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { editorState, loading, buttonLoading } = this.state

    return (
      <Spin spinning={loading} >
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