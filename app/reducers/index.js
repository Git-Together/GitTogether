import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import team from './team';
import repo from './repo';
import ui from './ui';
import files from './files';
import settings from './settings';
import conventions from './conventions';
import branches from './branches';
import chat from './chat';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  team,
  repo,
  ui,
  files,
  settings,
  conventions,
  branches,
  routing,
  chat
});

export default rootReducer;
