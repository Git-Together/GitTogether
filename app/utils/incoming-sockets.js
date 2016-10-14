import io from 'socket.io-client';
import Promise from 'bluebird';
import * as TeamActions from '../actions/team-actions.js'
import * as ChannelActions from '../actions/channel-actions.js'
import * as AuthActions from '../actions/auth-actions.js'
const storage = Promise.promisifyAll(require('electron-json-storage'))

let socket = null
export function instantiateSockets (state, dispatch) {
	socket = io.connect(process.env.SOCKET_URL)
	dispatch(AuthActions.socketsStarted())
	let currentUser = state.auth.currentUser
	socket.emit('passLogin', currentUser)

	socket.on('fileChanges', payload => {
		let channels
		if (payload.username != currentUser) {
			storage.getAsync('channels')
				.then(cachedChannels => {
					let channels = Object.keys(cachedChannels[currentUser])
					if (channels.includes(payload.channel)) {
						new Notification(payload.username + ' just ' + payload.event + " " + payload.filepath + ' in ' + payload.branch.current + '.', { silent: 'true' })
					}
				})
		}
	})

	socket.on('reloadTeam', channelName => {
		console.log("i got added or removed")
		dispatch(TeamActions.refreshTeamMembers())
	})

	socket.on('reloadChannels', channelName => {
		dispatch(ChannelActions.loadChannels())
	})
}

export function stopSockets() {
	if (socket) {
		socket.removeAllListeners()
	}
}

