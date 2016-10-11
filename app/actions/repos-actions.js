export const GET_USER_REPOS = 'GET_USER_REPOS';
export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const ADD_MESSAGE_TO_REPO_PANEL = 'ADD_MESSAGE_TO_REPO_PANEL';
export const CHANGE_ACTIVE_REPO = 'CHANGE_ACTIVE_REPO';

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

export function addChannel(channel) {
	let channelName = channel.full_name
	return (dispatch, getState) => {
		let currentUser = getState().auth.currentUser
		let userId = getState().auth.id
		let repo = getState().repo
		let channelStorage
		storage.get('channels', (err, result) => {
			if (err) {
				console.error(err)
				channelStorage = {}
			}

			channelStorage = result
			let userStorage = channelStorage[currentUser]
			userStorage[channelName] = null
			storage.set('channels', {...channelStorage, [currentUser]: userStorage})
			let channels = Object.keys(userStorage)

			return axios.post(process.env.SERVER_URL + `/api/channels/${userId}`, {
			// return axios.post(`http://localhost:1337/api/channels/${userId}`, {	
				repoId: channelName
			})
				.then(createdChannel => {
					dispatch({
						type: LOAD_CHANNELS,
						channels
					})
				})
		})
	}
}

export function removeChannel(id) {
	return (dispatch, getState) => {
		let currentUser = getState().auth.currentUser
		let userId = getState().auth.id
		let channelStorage
		storage.get('channels', (err, result) => {
			if (err) {
				console.error(err)
				channelStorage = {}
			}
			channelStorage = result
			delete channelStorage[currentUser][id]
			storage.set('channels', channelStorage, err => console.error)
			let channels = Object.keys(channelStorage[currentUser])
			return axios.put(process.env.SERVER_URL + `/api/channels/remove?channelId=${id}&userId=${userId}`)
			// return axios.put(`http://localhost:1337/api/channels/remove?channelId=${id}&userId=${userId}`)
				.then(() => {
					dispatch({
						type: LOAD_CHANNELS,
						channels
					})
				})
		})
	}
}

export function changeActiveRepo(id){
    return {
        type: CHANGE_ACTIVE_REPO,
        id
    }
}

export function addMessageToRepoPanel(message){
    return{
        type: ADD_MESSAGE_TO_REPO_PANEL,
        message
    }
}

// export function addRepo(repo) {
// 	return {
// 		type: ADD_REPO,
// 		repo
// 	};
// }

// export function removeRepo(id) {
// 	return {
// 		type: REMOVE_REPO,
// 		id
// 	};
// }
