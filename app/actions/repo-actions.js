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
import { getOnline } from '../utils/incoming-sockets.js'
import { TOGGLE_COMPONENT, TOGGLE_TREE } from './ui-actions';
import { RESET_WATCH, GET_ALL_WATCH } from './watch-actions';
import { CHANGE_ACTIVE_TEAM } from './team-actions';
import { CHANGE_ACTIVE_REPO } from './repos-actions';
import { LOAD_MESSAGES } from './chat-actions.js';
import Promise from 'bluebird';
const storage = Promise.promisifyAll(require('electron-json-storage'))

export function getCurrentChannel() {
	return (dispatch, getState) => {
		return getState().repo.channelName
	}
}

export function getUserRepos() {
	return (dispatch, getState) => {
		axios.get(`https://api.github.com/user/repos?affiliation=owner,collaborator&per_page=100&access_token=${getState().auth.token}`)
			.then(repos => dispatch({
				type: GET_USER_REPOS,
				repos: repos.data
			}));
	};
}

export function getRepoTree(repo) {
	return (dispatch, getState) => {
		let state = getState()
		let user = state.auth.currentUser
		let token = state.auth.token;
		let currentView = state.ui.selected
		let watchArray = [];
		let repoId;
		let channelName
		let fetchedRepo;
		let userId
		axios.get(`https://api.github.com/repos/${repo}?access_token=${state.auth.token}`)
			.then(fetched => {
				fetchedRepo = fetched
				repoId = fetchedRepo.data.id
				return axios.get(`https://api.github.com/repos/${repo}/git/refs/?access_token=${state.auth.token}`)
			}).then(repoSha => {
				return axios.get(`https://api.github.com/repos/${repo}/git/trees/${repoSha.data[0].object.sha}?recursive=1&access_token=${state.auth.token}`);
			}).then(tree => {
				dispatch({
					type: SWITCH_ACTIVE_TREE,
					tree
				})
				let channelName = repo.split('/').join('*');
				return axios.get(process.env.SERVER_URL + `/api/channels/${channelName}`)
			}).then((channel) => {
				let events = channel.data.events
				let chatHistory = channel.data.chats.map(chat => {
					return {
						message: chat.message,
						author: chat.authorName,
						id: chat.id,
						timeStamp: chat.createdAt
					}
				})
				dispatch({
					type: SWITCH_ACTIVE_REPO,
					id: repoId,
					name: repo,
					events
				})
				dispatch({
					type: CHANGE_ACTIVE_TEAM,
					channelId: repo,
				})
				dispatch({
					type: CHANGE_ACTIVE_REPO,
					id: repo
				})
				dispatch({
					type: TOGGLE_TREE,
					component: currentView
				})
				dispatch({
					type: LOAD_MESSAGES,
					chatHistory
				})
			}).then(() => {
				return storage.getAsync('channels')
			}).then(cachedChannels => {
				dispatch({
					type: CHANGE_CHANNEL_PATH,
					path: cachedChannels[user][repo]
				})
				dispatch({
					type: RESET_WATCH
				})
				userId = state.auth.id;
				let watchList = [];
				getOnline(repo)
				return axios.get(process.env.SERVER_URL + '/api/files/?userId=' + userId)

			})
			.then(watchFileList => {
				let watchArray = watchFileList.data.filter(e => e.repoId === channelName) 
				dispatch({
					type: GET_ALL_WATCH,
					watchList: watchArray
				})
				return axios.get(`https://api.github.com/repos/${repo}/collaborators?access_token=${state.auth.token}`)
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
