export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER';
export const REFRESH_TEAM_MEMBERS = 'REFRESH_TEAM_MEMBERS';
export const CHANGE_ACTIVE_TEAM_MEMBER = 'CHANGE_ACTIVE_TEAM_MEMBER'
export const CHANGE_ACTIVE_TEAM = 'CHANGE_ACTIVE_TEAM';
export const GET_USER_CHANGES = 'GET_USER_CHANGES';

import GitHub from 'github-api';
import axios from 'axios';
import { CHANGE_ACTIVE_MEMBER } from './member-actions';
import { TOGGLE_TREE } from './ui-actions';

export function addTeamMember(input) {
	let name
	if (typeof input === "object") {
		name = input.name
	} else {
		name = input
	}
	return (dispatch, getState) => {
		axios.post(process.env.SERVER_URL + `/api/channels/${name}`, { repoId: getState().repo.channelName, userName: name })
			// axios.post(`http://localhost:1337/api/channels/${name}`, {repoId: getState().repo.channelName, userName: name})
			.then(() => {
				dispatch({
					type: ADD_TEAM_MEMBER,
					repoId: getState().repo.channelName,
					name,
				})
			})
	};
}

export function changeActiveTeamMember(id) {
	return (dispatch) => {
		 dispatch({
			type: CHANGE_ACTIVE_TEAM_MEMBER,
			id
		});
		dispatch({
			type: CHANGE_ACTIVE_MEMBER,
			id
		});
		dispatch({
			type: TOGGLE_TREE,
			component: 'member'
		})
	}

}

export function changeSelectedTeam(channelId) {
	return {
		type: CHANGE_ACTIVE_TEAM,
		channelId
	}
}

export function removeTeamMember(id, repoId) {
	return (dispatch, getState) => {
		axios.put(process.env.SERVER_URL + `/api/channels/remove?channelId=${getState().repo.channelName}&userName=${id}`)
			// return axios.put(`http://localhost:1337/api/channels/remove?channelId=${getState().repo.channelName}&userName=${id}`)
			.then(() => {
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

// Get last 10 files changes for the given user, ordered.
export function getUserChanges(username) {
  return (dispatch, getState) => {
		let channelName = getState().repo.channelName.split('/').join('*');
			axios.get(process.env.SERVER_URL + `/api/events/user/${username}?repoId=${channelName}`)
			.then(userEvents => {
			console.log('USER EVENTS', userEvents);	
			dispatch({
				type: GET_USER_CHANGES,
				userEvents: userEvents.data
			})
		});
	};
}

export function changeActiveTeamMemberAsync(username){
	return (dispatch, getState) => {
		dispatch(getUserChanges(username))
		dispatch(changeActiveTeamMember(username))
	}
}