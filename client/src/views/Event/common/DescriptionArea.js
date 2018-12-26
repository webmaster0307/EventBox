
import React, { Component } from 'react'
import { Input, Form, Row, Col, Divider } from 'antd'
import { formRuleNotEmpty, formItemLayout } from './constants'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import { inject } from 'mobx-react'

const FormItem = Form.Item

@inject('stores')
class DescriptionArea extends Component{

  onEditorStateChange = (editorState) => {
    this.props.stores.event.editorEventCreate = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  }

  formFields = () => [
    {
      name: 'title',
      title: 'Title',
      customRender: <Input placeholder='Title' />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      customRender: <Input placeholder='Thumbnail' />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      customRender: <Input placeholder='Short description' />
    }
  ]

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
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
            editorStyle={{border: '1px #E6E6E6 solid', padding: 12}}
            name='editor'
            onEditorStateChange={this.onEditorStateChange}
          />
        </FormItem>
      </>
    )
  }
}

// export default DescriptionArea

const DescriptionAreaWrapper = (props) => (
  <Row>
    <Col span={6}>
      <strong style={{fontWeight: 'bold', fontSize: 16}} >Description</strong>
    </Col>
    <Col span={18} >
      <DescriptionArea {...props} />
    </Col>
    <Divider />
  </Row>
)

export default DescriptionAreaWrapper