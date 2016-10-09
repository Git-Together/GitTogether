import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';
import storage from 'electron-json-storage';

let state = {
  auth: {}
};
// storage.clear(err => console.error)
storage.get('user', (err, result) => {
  console.log("This is result for auth in index",result);
  if (err) console.error(err)
  state.auth.currentUser = result.currentUser;
  state.auth.token = result.token;
  state.auth.id = result.id;
  const store = configureStore(state);
  const history = syncHistoryWithStore(hashHistory, store);

  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );


})

