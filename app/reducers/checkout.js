import { CHECKOUT_FILE, RETURN_FILE } from '../actions/checkout';

const initState = [];

export default function checkout(state = initState, action){
  switch (action.type){
    case CHECKOUT_FILE:
      if((state.map(e => e.fileId).indexOf(action.fileId) < 0) && (state.map(e => e.repoId).indexOf(action.repoId) < 0) ){

      let newCheckout = {
        repoId: action.repoName,
        fileId: action.fileId,
        userName: action.userName,
        timeStamp: new Date()
      };
    return [...state, newCheckout];
    } else{
      return state;
    }

    case RETURN_FILE:
    for (let i = 0; i < state.length; i++){
      if(state[i].repoId === action.repoName && state[i].fileId === action.fileId && state[i].userName === action.userName){
        let indexToDelete = i;
        break;
      }
    }
    return [...state.slice(0, indexToDelete), ...state(indexToDelete+1)]

    default:
      return state;
  }
}
