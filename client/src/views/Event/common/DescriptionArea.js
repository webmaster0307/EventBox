import React, { Component } from 'react'
import { Input, Form, Row, Col, Divider, InputNumber, DatePicker } from 'antd'
import { formRuleNotEmpty, formItemLayout } from './constants'
import { Editor } from 'react-draft-wysiwyg'
import { inject, observer } from 'mobx-react'
import UploadDragger from './UploadDragger'

const FormItem = Form.Item

@inject('stores')
@observer
class DescriptionArea extends Component {
  formFields = () => {
    const thumbnailSrc = this.props.form.getFieldValue('thumbnail')

    return [
      {
        name: 'title',
        title: 'Title',
        customRender: <Input placeholder='Title' />,
        rules: [formRuleNotEmpty]
      },
      {
        name: 'thumbnail',
        title: 'Thumbnail',
        customRender: <UploadDragger imageSrc={thumbnailSrc} />,
        rules: [formRuleNotEmpty]
      },
      {
        name: 'maxTickets',
        title: 'Max number of tickets',
        customRender: <InputNumber min={1} max={100} />,
        rules: [formRuleNotEmpty],
        initialValue: 20
      },
      {
        name: 'registerEndAt',
        title: 'Close registration by',
        customRender: (
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            placeholder='Select Time'
            allowClear={false}
          />
        ),
        rules: [formRuleNotEmpty]
      },
      {
        name: 'shortDescription',
        title: 'Short Description',
        customRender: <Input placeholder='Short description' />
      }
    ]
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
        {this.formFields().map((field) => {
          const { name, title, rules, initialValue, customRender } = field
          return (
            <FormItem key={name} label={title} colon={false} {...formItemLayout}>
              {getFieldDecorator(name, {
                rules,
                initialValue
              })(customRender)}
            </FormItem>
          )
        })}
        <FormItem key='description' label='Description' colon={false} {...formItemLayout}>
          <EditorWrapper />
        </FormItem>
      </>
    )
  }
}

// export default DescriptionArea

const DescriptionAreaWrapper = (props) => (
  <Row>
    <Col span={6}>
      <strong style={{ fontWeight: 'bold', fontSize: 16 }}>Description</strong>
    </Col>
    <Col span={18}>
      <DescriptionArea {...props} />
    </Col>
    <Divider />
  </Row>
)

const EditorWrapper = inject('stores')(
  observer(({ stores: { event } }) => {
    const { editorEventCreate } = event

    return (
      <Editor
        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        editorStyle={{ border: '1px #E6E6E6 solid', padding: 12 }}
        name='editor'
        editorState={editorEventCreate}
        onEditorStateChange={(editorState) => {
          event.editorEventCreate = editorState
        }}
      />
    )
  })
)

export default DescriptionAreaWrapper
