import React from 'react'
import { Upload, Icon, message } from 'antd'

const Dragger = Upload.Dragger

class UploadDragger extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      imageSrc: ''
    }
  }

  componentDidMount = () => {
    // console.log('env: ',process.env.REACT_APP_EVENTBOX_UPLOAD)
  }

  componentWillReceiveProps = (prevProps) => {
    const { imageSrc } = this.props
    if(imageSrc){
      this.setState({ imageSrc })
    }
  }

  uploadProps = () => {
    const self = this
    return({
      name: 'file',
      accept: '.png, .jpg, .jpeg',
      showUploadList: false,
      action: `${process.env.REACT_APP_EVENTBOX_UPLOAD}/upload`,
      handlePreview: (file) => {
        // console.log('file: ',file)
        this.setState({ previewVisible: true })
      },
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
          const imageSrc = `${process.env.REACT_APP_EVENTBOX_UPLOAD}/image/${info.file.response.file.filename}`
          self.setState({ imageSrc })
          self.props.onChange && self.props.onChange(imageSrc)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    })
  }

  render() {
    const { imageSrc } = this.state

    return (
      <Dragger {...this.uploadProps()}>
        {imageSrc && <img src={imageSrc} style={{maxHeight: '25vh', marginBottom: 14}} alt='logo' />}
        <p className='ant-upload-drag-icon'>
          <Icon type='inbox' />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      </Dragger>
    )
  }
}

export default UploadDragger