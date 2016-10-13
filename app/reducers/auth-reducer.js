import { SOCKETS_STARTED, LOGIN, LOGOUT, SET_USER } from '../actions/auth-actions'

const initialState = {
	currentUser: null,
	token: null,
	id: null,
	socketsStarted: false
}

export default function auth(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return state
		case LOGOUT:
			return state
		case SET_USER:
			return { socketsStarted: false, currentUser: action.currentUser, token: action.token, id: action.id}
		case SOCKETS_STARTED:
			return { ...state, socketsStarted: true }
		default:
			return state
	}
}
