
import React, { Component } from 'react'
import { Form, Row, Col, Divider, DatePicker, Input } from 'antd'
import { formItemLayout, formRuleNotEmpty } from './constants'

const FormItem = Form.Item

class DateHoldingArea extends Component{

  // onChangeStartTime = values => {
  //   const startTime = values._d.getTime()
  //   this.props.form.setFieldsValue({ startTime })
  // }

  //   const startTime = values._d.getTime()
  //   this.props.form.setFieldsValue({ startTime })
  // }

  // onChangeEndTime = values => {
  //   const endTime = values._d.getTime()
  //   console.log('end: ' ,endTime)
  //   // this.props.form.setFieldsValue({ endTime })
  // }

  // onSetEndTime = values => {
  //   const endTime = values._d.getTime()
  //   console.log('end: ' ,endTime)
  //   // this.props.form.setFieldsValue({ endTime })
  // }

  validateStartTime = (rule, value, callback) => {
    if(!value){
      return callback('Please select time!')
    }
    const { getFieldValue, validateFields } = this.props.form
    const endTime = getFieldValue('endTime')
    if(!endTime){
      validateFields(['endTime'], { force: true })
    }
    const startTime = value._d.getTime()
    if(startTime >= endTime){
      return callback('Start time can not later than end time')
    }

    callback()
  }

  validateEndTime = (rule, value, callback) => {
    if(!value){
      return callback('Please select time!')
    }
    const { getFieldValue, validateFields } = this.props.form
    const startTime = getFieldValue('startTime')
    if(!startTime){
      validateFields(['startTime'], { force: true })
    }
    const endTime = value._d.getTime()
    if(startTime >= endTime){
      return callback('End time can not earlier than start time')
    }

    callback()
  }

  formFields = () => [
    {
      name: 'startTime',
      title: 'Event start from',
      customRender: 
        <DatePicker 
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder="Select Time"
          onChange={this.onChangeStartTime}
          allowClear={false}
        />,
      rules: [{
        validator: this.validateStartTime
      }]
    },
    {
      name: 'endTime',
      title: 'Event end at',
      customRender: 
        <DatePicker 
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder="Select Time"
          allowClear={false}
        />,
      rules: [{
        validator: this.validateEndTime
      }]
    },
    {
      name: 'location',
      title: 'Place',
      customRender: <Input placeholder='Where event take place' />,
      rules: [formRuleNotEmpty]
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
      </>
    )
  }
}

const DateHoldingWrapper = (props) => (
  <Row>
    <Col span={6}>
      <strong style={{fontWeight: 'bold', fontSize: 16}} >Date</strong>
    </Col>
    <Col span={18} >
      <DateHoldingArea {...props} />
    </Col>
    <Divider />
  </Row>
)

export default DateHoldingWrapper