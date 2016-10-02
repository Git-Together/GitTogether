import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import team from './team'
import repo from './repo'
// import counter from './counter';

const rootReducer = combineReducers({
  team,
  repo,
  routing
});

export default rootReducer;
