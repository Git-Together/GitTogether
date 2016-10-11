import { CHECKOUT_FILE, RETURN_FILE } from '../actions/watch-actions.js';

const initState = { icon: 'glyphicon glyphicon-eye-open', panelMessage: {
    label: "You are watching:",
    text: "7 files"
  } };

export default function watch(state = initState, action){
  switch (action.type){
    case CHECKOUT_FILE:
      if((state.map(e => e.fileId).indexOf(action.fileId) < 0) && (state.map(e => e.repoId).indexOf(action.repoId) < 0) ){

      let newCheckout = {
        repoId: action.repoName,
        fileId: action.fileId,
        userId: action.userId,
        timeStamp: new Date()
      };
    return [...state, newCheckout];
    } else{
      return state;
    }

    case RETURN_FILE:
    for (let i = 0; i < state.length; i++){
      if(state[i].repoId === action.repoName && state[i].fileId === action.fileId && state[i].userId === action.userId){
        var indexToDelete = i;
        return [...state.slice(0, indexToDelete), ...state.slice(indexToDelete+1)]
      }
    }
    return state;



    default:
      return state;
  }
}
