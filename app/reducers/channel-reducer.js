import { ADD_CHANNEL, REMOVE_CHANNEL, LOAD_CHANNELS } from '../actions/channel-actions';

export default function channel(state = {
    icon: 'glyphicon glyphicon-tasks',
    panelMessage: {
      label: "You are currently in:",
      text: "This Channel"
    },
    list: []
  }, action) {
  switch (action.type) {
    case ADD_CHANNEL:
      return [...state, action.channel];
    case REMOVE_CHANNEL:
      let idx = state.map(e => e.id).indexOf(action.id);
      return [...state.slice(0,idx),...state.slice(idx+1)];
	case LOAD_CHANNELS:
		return action.channels
    default:
      return state;
  }
}
