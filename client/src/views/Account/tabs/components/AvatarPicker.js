import React from 'react'
import { Button, Icon, Upload, Avatar } from 'antd'

export default () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      background: 'rgba(214, 229, 255, 0.4)',
      padding: 10
    }}
  >
    <p>Avatar</p>
    <Avatar
      size={144}
      icon='user'
      style={{
        marginBottom: 10
      }}
    />
    <Upload showUploadList={false}>
      <Button>
        <Icon type='upload' /> Change avatar
      </Button>
    </Upload>
  </div>
)
