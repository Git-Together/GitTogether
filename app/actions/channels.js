export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const LOAD_CHANNELS = 'LOAD_CHANNELS';

const storage = require('electron-json-storage')
import GitHub from 'github-api';
import axios from 'axios';

export function addChannel(channel) {
	let channelName = channel.full_name
	console.log('this is the channel', channelName)
	return (dispatch, getState) => {
		let currentUser = getState().auth.currentUser
		let userId = getState().auth.id
		let repo = getState().repo
		var channelStorage
		storage.get('channels', (err, result) => {
			if (err) {
				console.error(err)
				channelStorage = {}
			}

			channelStorage = result
			let userStorage = channelStorage[currentUser]
			userStorage[channelName] = null
			storage.set('channels', {...channelStorage, [currentUser]: userStorage})
		})

		return axios.post(process.env.SERVER_URL + `/api/channels/${userId}`, {
			repoId: channelName
		})	
			.then(createdChannel => {
				console.log(createdChannel)
				dispatch({
					type: ADD_CHANNEL,
					channel: channelName
				})
			})
	}
}

export function removeChannel(id) {
	console.log(id)
	return (dispatch, getState) => {
		let userStorage = getState().channels.filter(e => e != id)
		console.log(userStorage)
		let currentUser = getState().auth.currentUser	
		let userId = getState().auth.id	
		storage.get('channels', (err, result) => {
			let channelStorage = result
			storage.set('channels', {...channelStorage, [currentUser]: userStorage})
		})

		return axios.put(process.env.SERVER_URL + `/api/channels/remove?channelId=${id}&userId=${userId}`)
			.then(() => {
			dispatch({
				type: LOAD_CHANNELS,
				userStorage
			})
		})
	}
}

export function loadChannels() {
	return (dispatch, getState) => {
		storage.get('channels', (err, cachedChannels) => {
			console.log('cached channels here', cachedChannels)
			if (err) console.error(err)

			let currentUser = getState().auth.currentUser	
			let channels = Object.keys(cachedChannels[currentUser])
			dispatch({
				type: LOAD_CHANNELS,
				channels
			})
		})
	}
}
