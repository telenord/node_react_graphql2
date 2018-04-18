import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    })
      .then(() => {
        this.setState({content: ''});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>
            Add Lyrics:
          </label>
          <input
            type='text'
            name='title'
            value={this.state.content}
            onChange={event => {
              this.setState({content: event.target.value})
            }}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID){
  addLyricToSong(content: $content, songId:$songId){
     id
     lyrics {
      id
      content
     }
  }
}`;
export default graphql(mutation)(LyricCreate);