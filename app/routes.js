import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App-container';
import HomePage from './containers/HomePage-container';
import authCheck from './utils/checkLogin.js'
import Auth from './components/Auth/Auth-component.js'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Auth} />
	<Route path="/Home" component={HomePage} />
  </Route>
);
