export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER';
export const REFRESH_TEAM_MEMBERS = 'REFRESH_TEAM_MEMBER';
export const CHANGE_ACTIVE_TEAM_MEMBER = 'CHANGE_ACTIVE_TEAM_MEMBER'

import GitHub from 'github-api';
import axios from 'axios';

export function addTeamMember(member) {
	return (dispatch, getState) => {
		console.log(getState().repo)
		dispatch({
			type: ADD_TEAM_MEMBER,
			member
		})
	};
}

export function changeActiveTeamMember(id) {
	return {
		type: CHANGE_ACTIVE_TEAM_MEMBER,
		id
	};
}

export function removeTeamMember(id) {
	return {
		type: REMOVE_TEAM_MEMBER,
		id
	};
}

export function refreshTeamMembers() {
	return {
		type: REFRESH_TEAM_MEMBERS
	};
}
