import { ADD_CHANNEL, REMOVE_CHANNEL, LOAD_CHANNELS } from '../actions/channels';

export default function channel(state = [], action) {
  switch (action.type) {
    case ADD_CHANNEL:
      return [...state, action.channel];
    case REMOVE_CHANNEL:
      let idx = state.map(e => e.id).indexOf(action.id);
      return [...state.slice(0,idx),...state.slice(idx+1)];
	case LOAD_CHANNELS:
		return state.concat(action.channels)
    default:
      return state;
  }
}
