import { CHANGE_ACTIVE_MEMBER } from '../actions/member-actions';
import { GET_COLLABORATORS } from '../actions/repo-actions';
// export const GET_COLLABORATORS = 'GET_COLLABORATORS';


export default function member(state =
  {
    icon: 'glyphicon glyphicon-user',
    panelMessageArray: [
      {
        label: "Here Are your Members",
        text: "Member"
     }
    ],
    members: [],
    panelMessagePlayIndex: 0,
    activeMemberId: '',
  }, action) {
  switch (action.type) {
    case GET_COLLABORATORS:
      return {...state, members: action.collaborators};
    case CHANGE_ACTIVE_MEMBER:
      return {...state, activeMemberId: }
    default:
      return state;
  }
}
