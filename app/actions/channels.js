export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

import GitHub from 'github-api';
import axios from 'axios';

export function addChannel(channel) {
	return (dispatch, getState) => {
		let user = getState().auth
		let repo = getState().repo
		console.log(getState())

		return axios.post(process.env.SERVER_URL + `/api/channels/${user.id}`, {
			channel: {
				repoId: channel.id
			}
	   	})	
			.then(createdChannel => {
				console.log(createdChannel)
				dispatch({
					type: ADD_CHANNEL,
					channel
				})
			})
	}
}

export function removeChannel(id) {
	return (dispatch, getState) => {
		return axios.delete(process.env.SERVER_URL + `/api/channels/${id}`)
			.then(() => dispatch({
				type: REMOVE_CHANNEL,
				id
			}))
	}
}
