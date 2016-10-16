import { TOGGLE_TREE, TOGGLE_COMPONENT, ACTIVE_COMPONENT } from '../actions/ui-actions.js';


const initState = 'Dashboard';

export default function ui(state = {activeUi: 'home', selected:null}, action) {
  switch (action.type) {
    case TOGGLE_COMPONENT:
      if (state.selected === action.component) {
        return {...state, selected: null }
      }
      return {...state, selected: action.component }
    case TOGGLE_TREE:
      return {...state, selected: action.component }
    case ACTIVE_COMPONENT:
      return {...state, activeUi: action.componenet}
    default:
      return state;
  }
}
