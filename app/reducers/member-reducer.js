import {  } from '../actions/member-actions';

export default function member(state =
  {
    icon: 'glyphicon glyphicon-user',
    panelMessageArray: [
      {
        label: "Here are your Teammates",
        text: "Member"
     }
    ],
    members: [],
    panelMessagePlayIndex: 0,
    activeMemberId: 'repoOwner/repoName',
  }, action) {
  switch (action.type) {
    default:
      return state;
  }
}
