import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';


class SongDetail extends Component {

  render() {
    const {data:{song}, loading} = this.props;

    if (loading) {
      return <div>Loading</div>
    }

    if (song) {
      const {id, title} = song;
      return (
        <div>
          <Link to='/'>Back</Link>
          <div>{id}</div>
          <h3>{title}</h3>
          <LyricCreate songId={this.props.params.id}/>
        </div>
      )
    }

    return null;
  }
}

const query = gql`
query findSongById($id:ID!){
  song(id:$id){
    id
    title
  }
}`;

SongDetail = graphql(query, {
  options: ({params}) => {
    return {
      variables: {
        id: params.id
      }
    }
  }
})(SongDetail);

export default SongDetail;