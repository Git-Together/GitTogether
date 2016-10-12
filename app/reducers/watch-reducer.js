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

    let duplicate = (state.watch.length === 0) ? false: true

    state.watch.forEach(e => {
      if(e.id === action.repoName && e.name === action.fileId) {
        dubplicate = false;
      }
    })

    if(duplicate) {
      return state
    } else {

        let newWatch = {
          id: action.repoId,
          name: action.fileId,
          userId: action.userId,
          timeStamp: new Date()
        };

        return {...state, watch: [...state.watch, newWatch]}
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
      return {...state, activeWatch: action.fileId}

    case GET_WATCH:
      return state;

    default:
      return state;
  }
}


    //   if ((state.watch.map(e => e.fileId).indexOf(action.fileId) < 0) && (state.watch.map(e => e.repoId).indexOf(action.repoId) < 0)) {

    //   let newCheckout = {
    //     id: action.repoId,
    //     name: action.fileId,
    //     userId: action.userId,
    //     timeStamp: new Date()
    //   };

    // return {...state, watch: [...state.watch, newCheckout] };
    // } else{
    //   return state;
    // }
