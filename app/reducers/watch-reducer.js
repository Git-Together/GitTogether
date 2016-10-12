import { WATCH_FILE, UNWATCH_FILE, CHANGE_ACTIVE_WATCH, GET_WATCH } from '../actions/watch-actions.js';

const initState = {
  icon: 'glyphicon glyphicon-eye-open',
  panelMessageArray: [
    {
      label: "Here Are your Watches",
      text: "Watch"
    }
  ],
  watch: [],
  panelMessagePlayIndex: 0,
  activeWatch: 'default'

};

export default function watch(state = initState, action){
  switch (action.type){

    case WATCH_FILE:
      if ((state.watch.map(e => e.name).indexOf(action.fileId) < 0) && (state.watch.map(e => e.id).indexOf(action.repoId) < 0)) {

      let newCheckout = {
        id: action.repoName,
        name: action.fileId,
        userId: action.userId,
        timeStamp: new Date()
      };

    return {...state, watch: [...state.watch, newCheckout] };
    } else{
      return state;
    }

    case UNWATCH_FILE:
    for (let i = 0; i < state.watch.length; i++) {
      if (state[i].name === action.fileId && state[i].id === action.repoName){
        var indexToDelete = i;

        return {...state, watch: [...state.slice(0, indexToDelete), ...state.slice(indexToDelete+1)] }
        // [...state.slice(0, indexToDelete), ...state.slice(indexToDelete+1)]
      }
    }
    return state;

    case CHANGE_ACTIVE_WATCH:
      return {...state, activeWatch: action.name}

    case GET_WATCH:
      return state;

    default:
      return state;
  }
}
