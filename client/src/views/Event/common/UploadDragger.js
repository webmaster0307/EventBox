import React from 'react'
import { Upload, Icon, message } from 'antd'

const Dragger = Upload.Dragger



class UploadDragger extends React.Component{

  componentDidMount = () => {
    // console.log('env: ',process.env.REACT_APP_EVENTBOX_UPLOAD)
  }

  uploadProps = () => {
    return({
      name: 'file',
      action: `${process.env.REACT_APP_EVENTBOX_UPLOAD}/upload`,
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    })
  }

  render() {
    return (
      <Dragger {...this.uploadProps()}>
        <p className='ant-upload-drag-icon'>
          <Icon type='inbox' />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </p>
      </Dragger>
    )
  }
}

export default UploadDragger