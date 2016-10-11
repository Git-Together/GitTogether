export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const SWITCH_ACTIVE_REPO = 'SWITCH_ACTIVE_REPO';
export const GET_USER_REPOS = 'GET_USER_REPOS';
export const SWITCH_ACTIVE_TREE = 'SWITCH_ACTIVE_TREE';
export const CHANGE_CHANNEL_PATH = 'CHANGE_CHANNEL_PATH';
export const GET_COLLABORATORS = 'GET_COLLABORATORS';

//Github API call
import GitHub from 'github-api';
import axios from 'axios';
import { TOGGLE_COMPONENT } from './ui-actions';
import Promise from 'bluebird';
const storage = Promise.promisifyAll(require('electron-json-storage'))

export function getUserRepos() {
  return (dispatch, getState) => {
	axios.get(`https://api.github.com/user/repos?affiliation=owner,collaborator&per_page=100&access_token=${getState().auth.token}`)
    .then(repos => dispatch({
          type: GET_USER_REPOS,
          repos: repos.data
    }));
  };
}

export function getRepoTree(repo){
		return (dispatch, getState) => {
			let user = getState().auth.currentUser
			let repoId;
			let fetchedRepo;
			axios.get(`https://api.github.com/repos/${repo}?access_token=${getState().auth.token}`)
				.then(fetched => {
					fetchedRepo = fetched
					repoId = fetchedRepo.data.id
					return axios.get(`https://api.github.com/repos/${repo}/git/refs/?access_token=${getState().auth.token}`)
				}).then(repoSha => {
					return axios.get(`https://api.github.com/repos/${repo}/git/trees/${repoSha.data[0].object.sha}?recursive=1&access_token=${getState().auth.token}`);
				}).then(tree => {
					dispatch({
						type: SWITCH_ACTIVE_TREE,
						tree
					})
				}).then(() => dispatch({
					type: SWITCH_ACTIVE_REPO,
					id: repoId,
					name: repo
				})).then(() => {
					return storage.getAsync('channels')
				}).then(cachedChannels=>dispatch({
					type: CHANGE_CHANNEL_PATH,
					path: cachedChannels[user][repo]
				})).then(() => dispatch({
					type: TOGGLE_COMPONENT,
					component: 'Repo View'
				})).then(() => {
					return axios.get(`https://api.github.com/repos/${repo}/collaborators?access_token=${getState().auth.token}`)
				}).then(collaborators => {
					dispatch({
						type: GET_COLLABORATORS,
						collaborators: collaborators.data.map(e => e.login)
					})
				})
		}
}

export function addRepo(repo) {
	return {
		type: ADD_REPO,
		repo
	};
}

export function removeRepo(id) {
	return {
		type: REMOVE_REPO,
		id
	};
}


//NOTE: THIS IS NOW INCLUDED WITH getRepoTree
// export function switchActive(id){
//   return {
//     type: SWITCH_ACTIVE_REPO,
//     id
//   }
// }
