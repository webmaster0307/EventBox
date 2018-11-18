import React, { Component } from 'react'
import { Editor as EditorWysiwyg} from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState } from 'draft-js';
import EventDelete from '../EventDelete';

class EventItem extends Component{

  state = {
    editorState: EditorState.createEmpty(),
  }

  render(){
    const { event, me } = this.props
    // console.log('message: ' ,message);
    const eventDetail = event && EditorState.createWithContent(
      convertFromRaw(JSON.parse(event.description))
    );

    return(
      <div>
        <h3>{event.user.username}</h3>
        <div><span>Title: <label>{event.title}</label></span></div>
        <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
          <EditorWysiwyg editorState={eventDetail} readOnly toolbarHidden />
        </div>
        <div><small>Created at: {new Date(Number(event.createdAt)).toLocaleString()}</small></div>

        {me &&
          event.user.id === me.id && (
            <EventDelete event={event} />
          )}
      </div>
    )
  }
}

export default EventItem