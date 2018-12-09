import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, DatePicker, Button } from 'antd'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { formItemLayout, formRuleNotEmpty } from './constants'

const FormItem = Form.Item
const Option = Select.Option

class CreateDraftEvent extends Component {
  formItem = () => [
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'title',
      title: 'Title',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'location',
      title: 'Location',
      customRender:
        <div>
          <Input />
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option key='a' value="jack">Jack</Option>
            <Option key='b' value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option key='a' value="jack">Jack</Option>
            <Option key='b' value="lucy">Lucy</Option>
          </Select>
        </div>,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'categoryId',
      title: 'Category',
      customRender:
        <Select defaultValue="lucy" style={{ width: 120 }}>
          <Option key='a' value="jack">Jack</Option>
          <Option key='b' value="lucy">Lucy</Option>
        </Select>,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'shortDescription',
      title: 'Short description',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'description',
      title: 'Description',
      customRender:
        <EditorWysiwyg
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorStyle={{border: '1px #E6E6E6 solid'}}
          name='editor'
          // editorState={editorState}
          // onEditorStateChange={this.onEditorStateChange}
        />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'orgName',
      title: 'Organizer Name',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'orgDescription',
      title: 'Organizer description',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'contactPhoneNumber',
      title: 'Telephone',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'contactEmail',
      title: 'Email',
      customRender:
        <Input />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'startTime',
      title: 'Start time',
      customRender:
        <DatePicker />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'endTime',
      title: 'End time',
      customRender:
        <DatePicker />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'regFrom',
      title: 'Register start',
      customRender:
        <DatePicker />,
      rules: [formRuleNotEmpty]
    },
    {
      name: 'regTo',
      title: 'Register end',
      customRender:
        <DatePicker />,
      rules: [formRuleNotEmpty]
    }
  ]

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form>
          {this.formItem().map(field => {
            const { name, title, rules, customRender } = field
            return (
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
          <Button htmlType='submit' type='primary'>Save</Button>
          <Button type='danger'>Cancel</Button>
          <Button >Submit</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(CreateDraftEvent))
