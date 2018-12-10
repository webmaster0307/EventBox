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
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      editorState: EditorState.createEmpty()
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
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
        <Input />,
      rules: []
    },
    {
      name: 'title',
      title: 'Title',
      customRender:
        <Input />,
      rules: []
    },
    {
      name: 'location',
      title: 'Location',
      customRender:
        <Input />,
      rules: []
    },
    {
      name: 'district',
      title: 'District',
      customRender:
        <Select placeholder='Select district' style={{ width: 120 }}>
          <Option key='a' value="jack">Jack</Option>
          <Option key='b' value="lucy">Lucy</Option>
        </Select>,
      rules: []
    },
    {
      name: 'city',
      title: 'City',
      customRender:
        <Select placeholder='Select city' style={{ width: 120 }}>
          <Option key='a' value="jack">Jack</Option>
          <Option key='b' value="lucy">Lucy</Option>
        </Select>,
      rules: []
    },
    {
      name: 'categoryId',
      title: 'Category',
      customRender:
        <Select placeholder='Select category' style={{ width: 120 }}>
          <Option key='a' value="jack">Jack</Option>
          <Option key='b' value="lucy">Lucy</Option>
        </Select>,
      rules: []
    },
    {
      name: 'shortDesc',
      title: 'Short description',
      customRender:
        <Input />,
      rules: []
    }
  ]
  formBody = () => [
    {
      name: 'orgName',
      title: 'Organizer Name',
      customRender:
        <Input />,
      rules: []
    },
    {
      name: 'orgDesc',
      title: 'Organizer description',
      customRender:
        <Input />,
      rules: []
    },
    {
      name: 'ctTelephone',
      title: 'Telephone',
      customRender:
        <Input />,
      rules: []
    },
    {
      name: 'ctEmail',
      title: 'Email',
      customRender:
        <Input />,
      rules: []
    },
    {
      name: 'eventTime',
      title: 'Start time',
      customRender:
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
        />,
      rules: []
    },
    {
      name: 'regTime',
      title: 'End time',
      customRender:
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
        />,
      rules: []
    }
  ]

  render() {
    const { editorState } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form onSubmit={this.handleSubmit} hideRequiredMark>
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
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(CreateDraftEvent))
