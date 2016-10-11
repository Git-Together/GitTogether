export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function addComment(fileSha, comment) {
  return {
    type: ADD_COMMENT,
    fileSha,
    comment
  };
}

export function editComment(fileSha, comment) {
  return {
    type: EDIT_COMMENT,
    fileSha,
    comment
  };
}

export function removeComment(fileSha, comment){
  return {
    type: REMOVE_COMMENT,
    fileSha,
    comment
  }
}
