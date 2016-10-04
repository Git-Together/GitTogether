import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';


//Github API call test
import axios from 'axios';
import GitHub from 'github-api';

const gh = new GitHub({});

const kintsang = gh.getUser('kintsang');

kintsang.listRepos()
  .then(function (result) {
  console.log(result);
  });



const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
