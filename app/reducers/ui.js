// import { SHOW_DASHBOARD, SHOW_REPOS, SHOW_CHAT, SHOW_TEAM, SHOW_CONVENTIONS, SHOW_BRANCHES, SHOW_FILEVIEW, SHOW_SETTINGS, TOGGLE_COMPONENT } from '../actions/ui';
import { TOGGLE_COMPONENT } from '../actions/ui';

const initState = 'Dashboard';

export default function ui(state = initState, action) {
  switch (action.type) {
    case TOGGLE_COMPONENT:
      return action.component;
    default:
      return state;
  }
}
