import {ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT} from '../actions/comment';

const initState =
  [
    {
      fileSha: 1,
      fileBranchId: 1,
      comment: 'This is the initial comment'
    },
    {
      fileSha: 2,
      fileBranchId: 2,
      comment: 'This is the initial comment'
    },
    {
      fileSha: 3,
      fileBranchId: 3,
      comment: 'This is the initial comment'
    }
  ];

export default function comment(state = initState, action){
  switch(action.type){
    case ADD_COMMENT:
      let newComment = {
        fileSha: action.fileSha,
        comment: action.comment,
        fileBranchId: action.fileBranchId
      };
        return [...state, newComment];

    case EDIT_COMMENT:
      for (var i = 0; i < state.length; i++){
        if(state[i].fileSha === action.fileSha && state[i].fileBranchId === action.fileSha){
          let index = i;
          break;
        }
      }
      return [...state.slice(0, index), {...state[index], comment: action.comment}, ...state(index+1)];

    case REMOVE_COMMENT:
      for (var i = 0; i < state.length; i++){
        if(state[i].fileSha === action.fileSha && state[i].fileBranchId === action.fileSha){
          let index = i;
          break;
        }
      }
      return [...state.slice(0,index), ...state.slice(index+1)];

      default:
        return state;

  }
}
