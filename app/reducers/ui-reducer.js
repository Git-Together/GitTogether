import { TOGGLE_COMPONENT } from '../actions/ui-actions.js';

const initState = 'Dashboard';

export default function ui(state = {}, action) {
  switch (action.type) {
    case TOGGLE_COMPONENT:
      return {...state, selected: action.component }
    default:
      return state;
  }
}
