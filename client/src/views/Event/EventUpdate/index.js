import React, { Component } from 'react'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js'
import { client } from '../../../'
import gql from 'graphql-tag'
import { message, Spin, Button } from 'antd'

const getEventDetail = gql`
  query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      description
      images {
        thumbnail
      }
      createdAt
      user {
        id
        username
        email
      }
    }
  }
`

const updateEvent = gql`
  mutation($id: ID!, $title: String!, $thumbnail: String!, $description: String!) {
    updateEvent(id: $id, title: $title, thumbnail: $thumbnail, description: $description) {
      title
      description
      images {
        thumbnail
      }
      createdAt
      user {
        id
        username
        email
      }
    }
  }
`

class EventItem extends Component{

  state = {
    loading: true,
    editorState: EditorState.createEmpty(),
    id: '',
    title: '',
    thumbnail: '',
    buttonLoading: false
  }

  componentDidMount = async () => {
    const { eventId } = this.props.match.params
    let result 
    try {
      result = await client.query({query: getEventDetail, variables: { eventId }})
    } catch (error) {
      return message.error('Failed to fetch event')
    }
    const { event } = result.data
    this.setState({
      loading: false,
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.event.description))),
      id: event.id,
      title: event.title,
      thumbnail: event.images.thumbnail
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleChangeInput = e => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleUpdate = () => {
    const { id, title, thumbnail, editorState } = this.state
    let result
    this.setState({ buttonLoading: true }, async () => {
      try {
        result = await client.mutate({
          mutation: updateEvent, 
          variables: { 
            id, 
            title, 
            thumbnail, 
            description: JSON.stringify(convertToRaw(editorState.getCurrentContent())) 
          } 
        })
      } catch (error) {
        this.setState({buttonLoading: false})
        return message.error('Failed to update event')
      }
      // const { updateEvent } = result.data
      console.log('event: ' ,result.data)
      message.success('Update event successfully!')
      this.setState({buttonLoading: false})
    })
  }
  

  render(){
    const { loading, title, thumbnail, editorState, buttonLoading } = this.state

    return(
      <Spin spinning={loading} >
        <div style={{marginBottom: 12, minHeight: 24}}  >
          <span><label>Title </label></span>
          <input 
            type='text' name='title' 
            style={{height: 18, minWidth: 250}} 
            onChange={this.handleChangeInput}
            value={title}
          />
        </div>
        <div style={{marginBottom: 12, minHeight: 24}}  >
          <span><label>Thumbnail </label></span>
          <input 
            type='text' name='thumbnail' 
            style={{height: 18, minWidth: 250}} 
            onChange={this.handleChangeInput}
            value={thumbnail}
          />
        </div>
        <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
          <EditorWysiwyg editorState={editorState} onEditorStateChange={this.onEditorStateChange} />
        </div>
        <Button type='primary' loading={buttonLoading} onClick={this.handleUpdate} >Update</Button>
      </Spin>
    )
  }
}

export default EventItem