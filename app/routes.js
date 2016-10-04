import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import checkLogin from './utils/checkLogin.js'
import Login from './containers/Login.js'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
	<Route path="Home" component={checkLogin(HomePage)} />
	
  </Route>
);



// import CounterPage from './containers/CounterPage';
// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={HomePage} />
//     <Route path="/counter" component={CounterPage} />
//   </Route>
// );
