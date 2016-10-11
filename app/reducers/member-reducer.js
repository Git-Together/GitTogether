import {  } from '../actions/member-actions';

export default function member(state =
  {
    icon: 'glyphicon glyphicon-th-list',
    panelMessageArray: [
      {
        label: "Here Are your Members",
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
