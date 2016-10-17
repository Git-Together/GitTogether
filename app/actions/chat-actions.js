// export const POST_MESSAGE = 'POST_MESSAGE';
// export const REFRESH_MESSAGES = 'REFRESH_MESSAGES';
// export const CHANGE_ACTIVEMESSAGE = 'CHANGE_ACTIVEMESSAGE';
export const ADD_MESSAGE = "ADD_MESSAGE"
export const LOAD_MESSAGES = "LOAD_MESSAGES"

import { sendChat } from '../utils/incoming-sockets.js'
import axios from 'axios'

export function addMessage(message) {
	return {
		type: ADD_MESSAGE,
		message
	}
}

export function loadMessages(channelName) {
	return (getState, dispatch) => {
		axios.get(`${process.env.SERVER_URL}/api/chat/${channelName}`)
			.then(result => {
				let chatHistory = result.data.map(chat => {
					return {
						message: chat.message,
						author: chat.authorName,
						id: chat.id,
						timeStamp: chat.createdAt
					}
				})

				dispatch({
					type: LOAD_MESSAGES,
					chatHistory
				})
			})
	}
}

