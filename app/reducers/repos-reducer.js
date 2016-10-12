import {GET_USER_REPOS, ADD_CHANNEL, REMOVE_CHANNEL, ADD_MESSAGE_TO_REPO_PANEL, CHANGE_ACTIVE_REPO } from '../actions/repos-actions';

export default function repos(state =
  {
    icon: 'glyphicon glyphicon-tasks',
    panelMessageArray: [
      {
        label: "Here Are your Repos",
        text: "Repos"
     }
    ],
    repos: [],
    panelMessagePlayIndex: 0,
    activeRepoId: 'repoOwner/repoName',
  }, action) {
  switch (action.type) {
    case GET_USER_REPOS:
      return {...state, repos: action.repos}
    case ADD_MESSAGE_TO_REPO_PANEL:
      return {...state, panelMessageArray: [...panelMessageArray, action.message]}
    case CHANGE_ACTIVE_REPO:
      return {...state, activeRepoId: action.id}
    default:
      return state;
  }
}
