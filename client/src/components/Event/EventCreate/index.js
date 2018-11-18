import React, { Component } from 'react';
import { EditorState, convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../Error';

const CREATE_EVENT = gql`
  mutation($title: String!, $description: String!) {
    createEvent(title: $title, description: $description) {
      id
      title,
      description,
      createdAt
      user {
        id
        username
      }
    }
  }
`;

class EventCreate extends Component {
  state = {
    title: '',
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleChangeInput = e => {
    const { name, value } = e.target
    this.setState({[name]: value});
  }

  onSubmit = async (event, createEvent) => {
    event.preventDefault();

    try {
      await createEvent();
      this.setState({ editorState: EditorState.createEmpty() });
    } catch (error) {}
  };

  render() {
    const { title, editorState } = this.state;
    const dataSubmit = { title, description: JSON.stringify(convertToRaw(editorState.getCurrentContent()))}

    return (
      <Mutation
        mutation={CREATE_EVENT}
        variables={dataSubmit}
      >
        {(createEvent, { data, loading, error }) => (
          <form
            onSubmit={event => this.onSubmit(event, createEvent)}
          >
            <h3>New Event</h3>
            <div style={{marginBottom: 12, minHeight: 24}}  >
              <span><label>Title </label></span>
              <input 
                type='textarea' name='title' 
                style={{height: 18, minWidth: 250}} 
                onChange={this.handleChangeInput} 
              />
            </div>
            <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <button type="submit">Send</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default EventCreate
