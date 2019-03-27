const formItemLayout = {
  // labelCol: {
  //   md: { span: 24 },
  //   lg: { span: 24 }
  // },
  // wrapperCol: {
  //   md: { span: 24 },
  //   lg: { span: 24 }
  // }
}

const formRuleNotEmpty = {
  type: 'string',
  required: true,
  whitespace: true,
  message: 'Not correct format'
}

const inputNumberNotEmpty = {
  type: 'number',
  required: true,
  message: 'Not a valid number'
}

export { formItemLayout, formRuleNotEmpty, inputNumberNotEmpty }
