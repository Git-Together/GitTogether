import { TOGGLE_TREE, TOGGLE_COMPONENT } from '../actions/ui-actions.js';


const initState = 'Dashboard';

export default function ui(state = {}, action) {
  switch (action.type) {
    case TOGGLE_COMPONENT:
      if (state.selected === action.component) {
        return {...state, selected: null }
      }
      return {...state, selected: action.component }
    case TOGGLE_TREE:
      return {...state, selected: action.component }
    default:
      return state;
  }
}
