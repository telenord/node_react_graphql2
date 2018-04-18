import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import SongList from './component/SongList';
import App from './component/App';
import SongCreate from './component/SongCreate';
import SongDetail from './component/SongDetail';


const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path='/songs/new' component={SongCreate}/>
          <Route path='/songs/:id' component={SongDetail}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root/>,
  document.querySelector('#root')
);
