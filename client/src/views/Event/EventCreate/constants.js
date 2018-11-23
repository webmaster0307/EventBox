const formItemLayout = {
  labelCol: {
    md: { span: 24 },
    lg: { span: 4 }
  },
  wrapperCol: {
    md: { span: 24 },
    lg: { span: 18 }
  }
}

const formRuleNotEmpty = {
  type: 'string',
  required: true,
  whitespace: true,
  message: 'Not correct format'
}

export {
  formItemLayout,
  formRuleNotEmpty
}