export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const SWITCH_ACTIVE_REPO = 'SWITCH_ACTIVE_REPO';

export function addRepo(repo) {
  return {
    type: ADD_REPO,
    repo
  };
}

export function removeRepo(id) {
  console.log("running removeRepo");
  return {
    type: REMOVE_REPO,
    id
  };
}

export function switchActive(id){
  return {
    type: SWITCH_ACTIVE_REPO,
    id
  }
}

