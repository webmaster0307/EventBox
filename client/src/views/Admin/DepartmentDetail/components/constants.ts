const ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}

const RULE_NOT_EMPTY = {
  type: 'string',
  required: true,
  whitespace: true,
  message: 'Not correct format'
}

export {
  ITEM_LAYOUT,
  RULE_NOT_EMPTY
}