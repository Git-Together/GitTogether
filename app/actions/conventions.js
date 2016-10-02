export const ADD_CONVENTIONS = 'ADD_CONVENTION'
export const UPDATE_CONVENTIONS = 'UPDATE_CONVENTION'
export const REMOVE_CONVENTIONS = 'REMOVE_CONVENTION'
export const REFRESH_CONVENTIONS = 'REFRESH_TEAM_MEMBER';

export function addConventions(convention) {
  return {
    type: ADD_CONVENTIONS,
    convention
  };
}

export function updateConventions(id, convention) {
  return {
    type: UPDATE_CONVENTIONS,
    id,
    convention
  };
}

export function removeConventions(id) {
  return {
    type: REMOVE_CONVENTIONS,
    id
  };
}

export function refreshConventions() {
  return {
    type: REFRESH_CONVENTIONS
  };
}
