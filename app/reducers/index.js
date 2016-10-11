import { createStore, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth-reducer';
// import channel from './channel-reducer';
// import chat from './chat-reducer';
// import file from './file-reducer';
// import member from './member-reducer';
// import repo from './repo-reducer';
import repos from './repos-reducer';
// import team from './team-reducer';
import ui from './ui-reducer';
// import watch from './watch-reducer';

const rootReducer = combineReducers({
  auth,
  // channel,
  // chat,
  // file,
  // member,
  // repo,
  repos,
	// team,
	ui,
	// watch,
	routing,
	form: formReducer,
});

export default rootReducer;
