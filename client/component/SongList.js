import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link , hashHistory } from 'react-router';
import query from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';

class SongList extends Component {

  deleteSong(id) {
    this.props.mutate({
      variables: {
        id: id
      }
    }).then(()=>this.props.data.refetch());
  }


  renderSongs() {
    if (this.props.data && this.props.data.songs) {
      return this.props.data.songs.map(({title, id}) => (
        <li className='collection-item' key={id}>
          <Link to={`/songs/${id}`}>{title}</Link>
            <i className='material-icons right' onClick={() => this.deleteSong(id)}>delete</i>
        </li>
      ));
    }
  }


  render() {
    if (this.props.loading) {
      return <div>Loading</div>
    }
    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>
        <Link to='/songs/new'
              className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
}

SongList = graphql(query)(SongList);
export default graphql(deleteSong)(SongList);