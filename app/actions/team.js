export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER';
export const REFRESH_TEAM_MEMBERS = 'REFRESH_TEAM_MEMBER';

export function addTeamMember(member) {
  return {
    type: ADD_TEAM_MEMBER,
    member
  };
}

export function removeTeamMember(id) {
  return {
    type: REMOVE_TEAM_MEMBER,
    id
  };
}

export function refreshTeamMembers() {
  return {
    type: REFRESH_TEAM_MEMBERS
  };
}
