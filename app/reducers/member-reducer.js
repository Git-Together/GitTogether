import { ADD_MESSAGE_TO_MEMBER_PANEL, CHANGE_ACTIVE_MEMBER } from '../actions/member-actions';
import { GET_COLLABORATORS } from '../actions/repo-actions';
// export const GET_COLLABORATORS = 'GET_COLLABORATORS';


export default function member(state =
  {
    icon: 'glyphicon glyphicon-user',
    panelMessageArray: [
      {
        label: "Here are your Teammates",
        text: ""
     }
    ],
    members: [],
    panelMessagePlayIndex: 0,
    activeMemberId: '',
  }, action) {
  switch (action.type) {
    case GET_COLLABORATORS:
      let membersMap = action.collaborators.map(e=> {
        return {name: e}
      })
      return {...state, members: membersMap};
    case CHANGE_ACTIVE_MEMBER:
      return {...state, activeMemberId: action.id }
	case ADD_MESSAGE_TO_MEMBER_PANEL:
	  return {...state, panelMessageArray: [action.message]}
    default:
      return state;
  }
}
