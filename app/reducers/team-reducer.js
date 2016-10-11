import { CHANGE_ACTIVE_TEAM_MEMBER, ADD_TEAM_MEMBER, REMOVE_TEAM_MEMBER, REFRESH_TEAM_MEMBERS } from '../actions/team-actions.js';

const initState =  {
  activeTeamMember: 1,
  defaultTeam: {
    1: []
  },
  testTeam: {
    1: []
  },
  icon: 'glyphicon glyphicon-refresh',
  panelMessage: {
    label: "Here Are Your Teams",
    text: "Teams"
  }
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
      if(!state.testTeam[action.repoId]) return {...state, testTeam:{...state.testTeam, [action.repoId]: [action.name]}};
      return {...state, testTeam:{...state.testTeam, [action.repoId]: [...state.testTeam[action.repoId], action.name]}};
    case REMOVE_TEAM_MEMBER:
      let idx = state.testTeam[action.repoId].indexOf(action.id);
      if (idx === -1) return state;
      return {...state, testTeam: {...state.testTeam, [action.repoId]: [...state.testTeam[action.repoId].slice(0, idx), ...state.testTeam[action.repoId].slice(idx + 1)] }};

    case REFRESH_TEAM_MEMBERS:
      //Get user.data.channels
      let teamObj = {};
      action.channels.forEach(channel => {
        channel.users.forEach(user => {
          if(user.name !== action.currentUser) teamObj[channel.repoId] ? teamObj[channel.repoId].push(user.name) : teamObj[channel.repoId] = [user.name];
        });
      });
      return {...state, testTeam: teamObj};
    default:
      return state;
  }
}
