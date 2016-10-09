export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER';
export const REFRESH_TEAM_MEMBERS = 'REFRESH_TEAM_MEMBER';
export const CHANGE_ACTIVE_TEAM_MEMBER = 'CHANGE_ACTIVE_TEAM_MEMBER'

import GitHub from 'github-api';
import axios from 'axios';

export function addTeamMember(input) {
	let name
	if (typeof input === "object") {
		name = input.name
	} else {
		name = input
	}
	return (dispatch, getState) => {
		axios.post(process.env.SERVER_URL + `/api/channels/${name}`, {repoId: getState().repo.channelName, userName: name})
		// axios.post(`http://localhost:1337/api/channels/${name}`, {repoId: getState().repo.channelName, userName: name})
		.then( () => {
			dispatch({
				type: ADD_TEAM_MEMBER,
				repoId: getState().repo.channelName,
				name,
			})
		})	
	};
}

export function changeActiveTeamMember(id) {
	return {
		type: CHANGE_ACTIVE_TEAM_MEMBER,
		id
	};
}

export function removeTeamMember(id, repoId) {
		return (dispatch, getState) => {
			axios.delete(process.env.SERVER_URL + `/api/channels/remove?channelId=${getState().repo.channelName}&userName=${id}`)
			// return axios.put(`http://localhost:1337/api/channels/remove?channelId=${getState().repo.channelName}&userName=${id}`)
			.then( () => {
				dispatch({
					type: REMOVE_TEAM_MEMBER,
					repoId: getState().repo.channelName,
					id
				});
			})
	}
}

export function refreshTeamMembers() {
	return (dispatch, getState) => {
		axios.get(process.env.SERVER_URL + `/api/users/${getState().auth.id}`)
		// axios.get(`http://localhost:1337/api/users/${getState().auth.id}`)
		.then( user => {
			dispatch({
				type: REFRESH_TEAM_MEMBERS,
				channels: user.data.channels,
				currentUser: getState().auth.currentUser
			});
		})
	};
}
