import { ADD_SETTINGS, UPDATE_SETTINGS, REMOVE_SETTINGS, REFRESH_SETTINGS } from '../actions/settings';

const initState =
  [
    {
      name: 'Setting 1',
      value: true,
      id: 1
    },
    {
      name: 'Setting 2',
      value: false,
      id: 2
    },
    {
      name: 'setting 3',
      value: true,
      id: 3
    },
  ]
;

export default function team(state = initState, action) {
  switch (action.type) {
    case ADD_SETTINGS:
      let id = ++state.map(e => e.id)[state.length-1];
      let newSetting = {...action.setting, id}
      return [...state, newSetting];

    case UPDATE_SETTINGS:
      let updateIdx = state.map(e => e.id).indexOf(action.id);
      if (updateIdx === -1) return state;
      return [...state.slice(0, updateIdx), action.setting, ...state.slice(updateIdx + 1)];

    case REMOVE_SETTINGS:
      console.log("in remove settings");
      let removeIdx = state.map(e => e.id).indexOf(action.id);
      if (removeIdx === -1) return state;
      console.log("removeIdx", removeIdx)
      return [...state.slice(0, removeIdx), ...state.slice(removeIdx + 1)];

    case REFRESH_SETTINGS:
      return [...action.settings];

    default:
      return state;
  }
}
