import { ADD_TEAM_MEMBER, REMOVE_TEAM_MEMBER, REFRESH_TEAM_MEMBERS } from '../actions/team';

const initState =
  [
    {
      name: 'Mike Thomas',
      id: 1
    },
    {
      name: 'Dave Thomas',
      id: 2
    },
    {
      name: 'Milad Pilaf',
      id: 3
    },
  ]
;

export default function team(state = initState, action) {
  switch (action.type) {
    case ADD_TEAM_MEMBER:
      let id = ++state.map(e => e.id)[state.length-1];
      let newMember = {...action.member, id:id}
      return [...state, newMember];
    case REMOVE_TEAM_MEMBER:
      let idx = state.map(e => e.id).indexOf(action.id);
      if (idx === -1) return state;
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case REFRESH_TEAM_MEMBERS:
      return [...action.team];
    default:
      return state;
  }
}
