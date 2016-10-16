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

export function sendMessage(message) {
	return (getState, dispatch) => {
		let state = getState()
		let currentUser = state.auth.currentUser
		let channelName = state.repo.channelName
		dispatch({
			type: ADD_MESSAGE,
			message
		})
		sendChat(message, currentUser, channelName)
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

// creates an action to post message
// export function postMessage(message, userId, postId) {
//   return {
//     type: POST_MESSAGE,
//     message,
//     userId,
//     postId,
//     timeStamp: new Date()
//   };
// }

// // creates an action to refresh messages
// export function refreshMessages(messages) {
//   return {
//     type: REFRESH_MESSAGES,
//     messages
//   };
// }

// export function changeActiveMessage(id) {
//   return {
//     type: CHANGE_ACTIVEMESSAGE,
//     id
//   };
// }
