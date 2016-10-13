import { CHANGE_ACTIVE_TEAM, CHANGE_ACTIVE_TEAM_MEMBER, ADD_TEAM_MEMBER, REMOVE_TEAM_MEMBER, REFRESH_TEAM_MEMBERS } from '../actions/team-actions.js';

const initState =  {
  activeTeamMember: 1,
  activeTeam: '',
  team: [],
  icon: 'glyphicon glyphicon-refresh',
  panelMessageArray: [
    {
      label: "Here are your Teams",
      text: "Teams"
   }
  ],
  panelMessagePlayIndex: 0,
  teamObj: {}
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
    case CHANGE_ACTIVE_TEAM:
      return {...state, activeTeam: action.channelId}  
    case ADD_TEAM_MEMBER:
      if(!state.teamObj[action.repoId]) return {...state, teamObj:{...state.teamObj, [action.repoId]: [action.name]}};
      return {...state, teamObj:{...state.teamObj, [action.repoId]: [...state.teamObj[action.repoId], action.name]}};
    case REMOVE_TEAM_MEMBER:
      let idx = state.teamObj[action.repoId].indexOf(action.id);
      if (idx === -1) return state;
      return {...state, teamObj: {...state.teamObj, [action.repoId]: [...state.teamObj[action.repoId].slice(0, idx), ...state.teamObj[action.repoId].slice(idx + 1)] }};

    case REFRESH_TEAM_MEMBERS:
      //Get user.data.channels
      let teamObj = {};
      action.channels.forEach(channel => {
        channel.users.forEach(user => {
          if(user.name !== action.currentUser) teamObj[channel.repoId] ? teamObj[channel.repoId].push(user.name) : teamObj[channel.repoId] = [user.name];
        });
      });
      return {...state, teamObj: teamObj};
    default:
      return state;
  }
}
