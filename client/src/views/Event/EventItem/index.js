import React, { Component } from 'react'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState } from 'draft-js'
import { client } from '../../../'
import gql from 'graphql-tag'
import { message, Spin, BackTop } from 'antd'

const getEventDetail = gql`
  query($eventId: ID!) {
    event(id: $eventId) {
      title
      description
      shortDescription
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
    editorState: EditorState.createEmpty(),
    loading: true,
    event: undefined
  }

  componentDidMount = async () => {
    const { eventId } = this.props.match.params
    let result 
    try {
      result = await client.query({query: getEventDetail, variables: { eventId }})
    } catch (error) {
      return message.error('Failed to fetch event')
    }
    this.setState({
      event: result.data.event,
      loading: false
    })
  }
  

  render(){
    const { loading, event } = this.state
    const eventDetail = event && EditorState.createWithContent(convertFromRaw(JSON.parse(event.description)))

    return(
      <Spin spinning={loading} >
        <h3>{event && event.user.username}</h3>
        <div><span>Title: <label>{event && event.title}</label></span></div>
        <div><strong>{event && event.shortDescription}</strong></div>
        <div style={{maxWidth: 800, border: '1px solid #E6E6E6', marginBottom: 12}} >
          <EditorWysiwyg editorState={eventDetail} readOnly toolbarHidden />
        </div>
        <div><small>Created at: {new Date(Number(event && event.createdAt)).toLocaleString()}</small></div>
        <BackTop />
      </Spin>
      // <Query query={getEventDetail} variables={{eventId}} >
      //   {({data, loading}) => {
      //     if(loading){
      //       return(<div>Loading....</div>)
      //     }
      //     const { title, description, createdAt, user } = data.event
      //     const eventDetail = EditorState.createWithContent(
      //       convertFromRaw(JSON.parse(description))
      //     );
      //     return(
      //       <Spin spinning={loading} >
      //         <h3>{user.username}</h3>
      //         <div><span>Title: <label>{title}</label></span></div>
      //         <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
      //           <EditorWysiwyg editorState={eventDetail} readOnly toolbarHidden />
      //         </div>
      //         <div><small>Created at: {new Date(Number(createdAt)).toLocaleString()}</small></div>
      //       </Spin>
      //     )
      //   }}
      // </Query>
    )
  }
}

export default EventItem