import { TOGGLE_COMPONENT } from '../actions/ui-actions.js';

const initState = 'Dashboard';

export default function ui(state = initState, action) {
  switch (action.type) {
    case TOGGLE_COMPONENT:
      return action.component;
    default:
      return state;
  }
}
