import { LOGIN, LOGOUT, SET_USER } from '../actions/auth'

const initialState = {
	currentUser: null,
	token: null
}

export default function login(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return 
		case LOGOUT:
			return null
		case SET_USER:
			return { currentuser: action.currentUser, token: action.token}
		default:
			return state
	}
}
