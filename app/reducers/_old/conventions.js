import { ADD_CONVENTIONS, UPDATE_CONVENTIONS, REMOVE_CONVENTIONS, REFRESH_CONVENTIONS } from '../actions/conventions';

const initState =
  [
    {
      name: 'Convention 1',
      value: true,
      id: 1
    },
    {
      name: 'Convention 2',
      value: false,
      id: 2
    },
    {
      name: 'Convention 3',
      value: true,
      id: 3
    },
  ]
;

export default function conventions(state = initState, action) {
  switch (action.type) {
    case ADD_CONVENTIONS:
      let id = ++state.map(e => e.id)[state.length-1];
      let newConvention = {...action.convention, id}
      return [...state, newConvention];

    case UPDATE_CONVENTIONS:
      let updateIdx = state.map(e => e.id).indexOf(action.id);
      if (updateIdx === -1) return state;
      return [...state.slice(0, updateIdx), action.convention, ...state.slice(updateIdx + 1)];

    case REMOVE_CONVENTIONS:
      let removeIdx = state.map(e => e.id).indexOf(action.id);
      if (removeIdx === -1) return state;
      return [...state.slice(0, removeIdx), ...state.slice(removeIdx + 1)];

    case REFRESH_CONVENTIONS:
      return [...action.conventions];

    default:
      return state;
  }
}
