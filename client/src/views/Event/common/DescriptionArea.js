import React, { Component } from 'react'
import { Input, Form, Row, Col, Divider, InputNumber, DatePicker, Select, Spin, Icon } from 'antd'
import { formRuleNotEmpty, formItemLayout, inputNumberNotEmpty } from './constants'
import { Editor } from 'react-draft-wysiwyg'
import { inject, observer } from 'mobx-react'
import UploadDragger from './UploadDragger'
import { Query } from 'react-apollo'
import { category } from '@gqlQueries'
import client from '@client'

const FormItem = Form.Item
const { Option } = Select

@inject('stores')
@observer
class DescriptionArea extends Component {
  renderCategories = () => {
    return client.query({ query: category.GET_CATEGORIES }).then((res) => {
      console.log('res: ', res)
      return <Option>abx</Option>
    })
  }

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
        rules: [inputNumberNotEmpty],
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
        rules: [{ required: true, message: 'Event must have close registration day' }]
      },
      {
        name: 'categories',
        title: 'Categories',
        customRender: <CategorySelect />
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

class CategorySelect extends Component {
  handleChange = (values) => {
    const { onChange } = this.props
    onChange(values)
  }
  render() {
    const { value } = this.props

    return (
      <Query query={category.GET_CATEGORIES}>
        {({ data, loading }) => {
          if (loading) {
            return <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
          }
          return (
            <Select
              mode='multiple'
              placeholder='Categories'
              style={{ width: '75%' }}
              onChange={this.handleChange}
              value={value}
            >
              {data.categories.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          )
        }}
      </Query>
    )
  }
}
