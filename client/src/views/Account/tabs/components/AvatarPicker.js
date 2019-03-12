import React, { Component } from 'react'
import { Button, Icon, Upload, Avatar, message } from 'antd'
import { client } from '@client'
import { user, session } from '@gqlQueries'

export default class AvatarPicker extends Component {
  handleUpload = async (file) => {
    try {
      // upload to server
      const { data } = await client.mutate({
        mutation: user.USER_UPLOAD_AVATAR,
        variables: { file }
      })
      if (data && data.photoUpload) {
        // update to local cache
        await client.mutate({
          mutation: session.UPDATE_ME_AVATAR,
          variables: { photo: data.photoUpload }
        })
      }
    } catch (error) {
      console.log('error: ', error)
      return message.error('Failed to update user avatar')
    }
  }

  uploadProps = () => {
    return {
      name: 'file',
      accept: '.png, .jpg, .jpeg',
      showUploadList: false,
      // action: `${process.env.REACT_APP_EVENTBOX_UPLOAD}/upload`,
      customRequest: async ({ file }) => {
        this.handleUpload(file)
      },
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          console.log('info: ', info)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
  }

  render() {
    const {
      uploadProps,
      props: { avatar }
    } = this
    return (
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
          src={avatar}
          icon='user'
          style={{
            marginBottom: 10
          }}
        />
        <Upload showUploadList={false} {...uploadProps()}>
          <Button>
            <Icon type='upload' /> Change avatar
          </Button>
        </Upload>
      </div>
    )
  }
}
