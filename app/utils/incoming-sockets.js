import io from 'socket.io-client';
import Promise from 'bluebird';
import * as TeamActions from '../actions/team-actions.js'
import * as ChannelActions from '../actions/channel-actions.js'
import * as AuthActions from '../actions/auth-actions.js'
import * as fileActions from '../actions/file-actions.js'
import * as memberActions from '../actions/member-actions.js'
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
            dispatch(fileActions.addMessageToFilePanel(`${payload.filePath}`));
					}
				})
		}
	})

	socket.on('reloadTeam', channelName => {
		dispatch(TeamActions.refreshTeamMembers())
    dispatch(memberActions.addMessageToMemberPanel(`${payload.filePath}`));
	})

	socket.on('reloadChannels', channelName => {
		dispatch(ChannelActions.loadChannels())
    dispatch(channelActions.addMessageToChannelPanel(`${payload.filePath}`));
	})
}

export function stopSockets() {
	if (socket) {
		socket.removeAllListeners()
	}
}

