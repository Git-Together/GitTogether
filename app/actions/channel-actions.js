// export const ADD_CHANNEL = 'ADD_CHANNEL';
// export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const LOAD_CHANNELS = 'LOAD_CHANNELS';
export const ADD_MESSAGE_TO_CHANNEL_PANEL = 'ADD_MESSAGE_TO_CHANNEL_PANEL'

import Promise from 'bluebird'
const storage = Promise.promisifyAll(require('electron-json-storage'))
import GitHub from 'github-api';
import axios from 'axios';
export function loadChannels() {
	return (dispatch, getState) => {
		let userStorage, channelStorage, currentUser, channels
		storage.getAsync('channels')
			.then(result => {
				channelStorage = result
				let state = getState()
				let userId = state.auth.id
				currentUser = state.auth.currentUser
				userStorage = channelStorage[currentUser] ? channelStorage[ currentUser ] : {}
				return axios.get(process.env.SERVER_URL + `/api/users/${userId}`)
			})
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
			.catch(err => console.error(err))
	}
}

export function addMessageToChannelPanel(message){
    return {
        type: ADD_MESSAGE_TO_CHANNEL_PANEL,
        message
    };
}

