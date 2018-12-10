import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, DatePicker, Button, Divider } from 'antd'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { formItemLayout } from './constants'
// import gql from 'graphql-tag'

const FormItem = Form.Item
const Option = Select.Option

// const CREATE_DRAFT_EVENT = gql`
//   mutation @client(
//     $thumbnail: String
//     $title: String!
//     $location: String
//     $categoryId: String
//     $shortDesc: String
//     $description: String
//     $orgName: String
//     $orgDesc: String
//     $ctTelephone: Int
//     $ctEmail: String
//     $eventTime: [Int]
//     $regTime: [Int]
//     $amountOfTicket: Int
//   ) {
//     createDraftEvent (
//       thumbnail: $thumbnail
//       title:	$title
//       location: $location
//       categoryId: $categoryId
//       shortDesc: $shortDesc
//       description: $description
//       orgName: $orgName
//       orgDesc: $orgDesc
//       ctTelephone: $ctTelephone
//       ctEmail: $ctEmail
//       eventTime: $eventTime
//       regTime: $regTime
//       amountOfTicket: $amountOfTicket
//     ) {
//       thumbnail title location categoryId shortDesc
//       description orgName orgDesc ctTelephone
//       ctEmail eventTime regTime amountOfTicket
//     }
//   }
// `

class CreateDraftEvent extends Component {
  state = {
    loading: false,
    thumbnail: '',
    title:'',
    location: '',
    categoryId: '',
    shortDesc: '',
    description: '',
    orgName: '',
    orgDesc: '',
    ctTelephone: '',
    ctEmail: '',
    eventTime: [],
    regTime: [],
    amountOfTicket: '',
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((values) => {
      console.log('Received values of form: ', values)
    })
  }

  handleChangeInput (e) {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  formHeader = () => [
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      customRender:
        <Input />
    },
    {
      name: 'title',
      title: 'Title',
      customRender:
        <Input />
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
        </div>
    },
    {
      name: 'categoryId',
      title: 'Category',
      customRender:
        <Select defaultValue="lucy" style={{ width: 120 }}>
          <Option key='a' value="jack">Jack</Option>
          <Option key='b' value="lucy">Lucy</Option>
        </Select>
    },
    {
      name: 'shortDesc',
      title: 'Short description',
      customRender:
        <Input />
    }
  ]
  formBody = () => [
    {
      name: 'orgName',
      title: 'Organizer Name',
      customRender:
        <Input />
    },
    {
      name: 'orgDesc',
      title: 'Organizer description',
      customRender:
        <Input />
    },
    {
      name: 'ctTelephone',
      title: 'Telephone',
      customRender:
        <Input />
    },
    {
      name: 'ctEmail',
      title: 'Email',
      customRender:
        <Input />
    },
    {
      name: 'eventTime',
      title: 'Start time',
      customRender:
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
        />
    },
    {
      name: 'regTime',
      title: 'End time',
      customRender:
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
        />
    }
  ]

  render() {
    const {
      editorState
      // loading, thumbnail, title, location,
      // categoryId, shortDesc, description, orgName, orgDesc,
      // ctTelephone, ctEmail, eventTime, regTime
    } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit} hideRequiredMark
        >
          {this.formHeader().map(field => {
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
          <Divider />
          {this.formBody().map(field => {
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
          <Divider />
        </Form>
        <div>
          <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorStyle={{border: '1px #E6E6E6 solid'}}
            name='editor'
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
          <Button htmlType='submit' type='primary'>Save</Button>
          <Button type='danger'>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(Form.create()(CreateDraftEvent))
