import React from 'react'
import { Tag } from 'antd'

const StatusTag = ({ status }) => {
  switch (status) {
    case 'draft': {
      return <Tag color='blue'>Draft</Tag>
    }
    case 'in-review': {
      return <Tag color='orange'>In Review</Tag>
    }
    case 'active': {
      return <Tag color='green'>Published</Tag>
    }
    case 'rejected': {
      return <Tag color='red'>Rejected</Tag>
    }
    default: {
      return <Tag color='blue'>{status}</Tag>
    }
  }
}

export default StatusTag
