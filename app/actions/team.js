export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER';
export const REFRESH_TEAM_MEMBERS = 'REFRESH_TEAM_MEMBER';
export const CHANGE_ACTIVE_TEAM_MEMBER = 'CHANGE_ACTIVE_TEAM_MEMBER'

import GitHub from 'github-api';
import axios from 'axios';

export function addTeamMember(name) {
	return (dispatch, getState) => {
		dispatch({
			type: ADD_TEAM_MEMBER,
			repoId: getState().repo.activeRepo,
			name,
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
			dispatch({
			type: REMOVE_TEAM_MEMBER,
			repoId: getState().repo.activeRepo,
			id
		});
	}
}

export function refreshTeamMembers() {
	return {
		type: REFRESH_TEAM_MEMBERS
	};
}
