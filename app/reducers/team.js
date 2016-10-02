import { CHANGE_ACTIVE_TEAM_MEMBER, ADD_TEAM_MEMBER, REMOVE_TEAM_MEMBER, REFRESH_TEAM_MEMBERS } from '../actions/team';

const initState =  {
  activeTeamMember: 1,
  team: [
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
};

function activeTeamMember(state = 1, action){
  switch (action.type) {
    case CHANGE_ACTIVE_TEAM_MEMBER:
      return action.id
    default:
      return state
  }
}

export default function team(state = initState, action) {
  switch (action.type) {

    case CHANGE_ACTIVE_TEAM_MEMBER:
      return {...state, activeTeamMember: activeTeamMember(state.activeTeamMember, action)};

    case ADD_TEAM_MEMBER:
      let id = ++state.team.map(e => e.id)[state.length-1];
      let newMember = {...action.member, id}
      return {...state, team: [...state.team, newMember]};

    case REMOVE_TEAM_MEMBER:
      let idx = state.team.map(e => e.id).indexOf(action.id);
      if (idx === -1) return state;
      return {...state, team: [...state.slice(0, idx), ...state.slice(idx + 1)]};

    case REFRESH_TEAM_MEMBERS:
      return {...state, team: [...action.team]};
    default:
      return state;
  }
}
