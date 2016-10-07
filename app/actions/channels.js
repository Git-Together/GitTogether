export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const LOAD_CHANNELS = 'LOAD_CHANNELS';

const storage = require('electron-json-storage')
import GitHub from 'github-api';
import axios from 'axios';

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
				.then(() => {
					dispatch({
						type: LOAD_CHANNELS,
						channels
					})
				})
		})

	}
}

export function loadChannels() {
	// storage.clear(err => console.error)
	return (dispatch, getState) => {
		storage.get('channels', (err, channelStorage) => {
			if (err) console.error(err)
			let userId = getState().auth.id
			let currentUser = getState().auth.currentUser	
			let userStorage = channelStorage[currentUser] ? channelStorage[ currentUser ] : {}
			let channels
			return axios.get(process.env.SERVER_URL + `/api/users/${userId}`)
				.then(result => {
					let user = result.data

					if (user.channels) {
						user.channels.forEach(channel => {
							if (!userStorage.hasOwnProperty(channel.repoId)) {
								userStorage[channel.repoId] = null
							}
						})
						storage.set('channels', {...channelStorage, [currentUser]: userStorage})
					} else {
						storage.set('channels', {...channelStorage, [currentUser]: {}})
					}
					channels = Object.keys(channelStorage[currentUser])
				})
				.then(() => dispatch({
					type: LOAD_CHANNELS,
					channels
				}))
		})
	}
}
