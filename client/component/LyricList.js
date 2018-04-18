import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import likeLyric from '../queries/likeLyric';

class LyricList extends Component {
  onLikeClick(id){
    this.props.mutate({
      variables: {
        id: id
      }
    })
      .then(()=>{
      console.log(this.props.lyrics);
    })
  .catch(err=>{
      console.log(err);
    });
  }

  renderLyrics() {
    if (this.props.lyrics) {
      return this.props.lyrics.map(({content, id, likes}) => (
        <li className='collection-item' key={id}>
          {content}
          <div className="vote-box right">
            <i className='material-icons right' onClick={()=>this.onLikeClick(id)}>thumb_up</i>
            <span className="">{likes}</span>
          </div>
        </li>
      ));
    }
  }

  render() {
    return (
      <ul className='collection'>
        {this.renderLyrics()}
      </ul>
    )
  }
}


export default graphql(likeLyric)(LyricList);