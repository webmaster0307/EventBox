import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Icon } from 'antd'
import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { formItemLayout, formRuleNotEmpty } from './constants'

const FormItem = Form.Item

class EventCreate extends Component{

  editor = null

  _handleCreatedEvent = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values) => {
      if(!err){
        // console.log('values: ',values)
      }
      console.log('editor: ' ,JSON.stringify(convertToRaw(this.editor.state.editorState.getCurrentContent())))
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
      customRender: <Input />,
      rules: [formRuleNotEmpty]
    }
  ]

  render() {
    const { getFieldDecorator } = this.props.form

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
          >
            <Icon type='form' />
            Create Event
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(withRouter(EventCreate))