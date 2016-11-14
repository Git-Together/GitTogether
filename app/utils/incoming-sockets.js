import io from 'socket.io-client';
import Promise from 'bluebird';
import * as TeamActions from '../actions/team-actions.js'
import * as MemberActions from '../actions/member-actions.js'
import * as ChannelActions from '../actions/channel-actions.js'
import * as AuthActions from '../actions/auth-actions.js'
import * as FileActions from '../actions/file-actions.js'
import * as RepoActions from '../actions/repo-actions.js'
import * as ReposActions from '../actions/repos-actions.js'
import * as WatchActions from '../actions/watch-actions.js'
import * as ChatActions from '../actions/chat-actions.js'
import moment from 'moment'
const storage = Promise.promisifyAll(require('electron-json-storage'))

let socket = null
export function instantiateSockets (state, dispatch) {
	socket = io.connect(process.env.SOCKET_URL)
	dispatch(AuthActions.socketsStarted())
	let currentUser = state.auth.currentUser

	socket.emit('passLogin', currentUser)

	socket.on('receiveMessage', body => {
		let message = body.message
		let author = body.author
		let timeStamp = body.timeStamp
		let currentChannel = dispatch(RepoActions.getCurrentChannel())
		if (body.channelName === currentChannel) {
			dispatch(ChatActions.addMessage({ message, author, timeStamp }))
		}	
	})

	socket.on('fileChanges', payload => {
		let changeTime = moment().format('h:mm a, MMMM Do')
		dispatch(FileActions.addMessageToFilePanel({
			label: "Most recent change:",
			text: `${payload.filepath}`
		}))
		dispatch(ReposActions.addMessageToReposPanel({
			label: "Last changed repo:",
			text: `${payload.channel}`
		}))
		dispatch(MemberActions.addMessageToMemberPanel({
			label: "Last active teammate:",
			text: `${payload.username}`
		}))

		let watchFileList = dispatch(WatchActions.getWatchFiles())
		let watchingFile = watchFileList.map(e => e.name).includes(payload.filepath.slice(1)) 
	
		if (watchingFile && payload.username != currentUser) {
			dispatch(WatchActions.addMessageToWatchPanel({
				label: "Last change to watched file:",
				text: `${payload.username} changed ${payload.filepath} in ${payload.channel} on ${changeTime}.`
			}))
			new Notification("GitTogether", {body: payload.username + ' just ' + payload.event + " " + payload.filepath + ' in ' + payload.channel + '.', silent: 'true' })
		} else if (!watchingFile && payload.username === currentUser) {
			new Notification("GitTogether", { body: "You just changed a file which you haven't subscribed to.", silent: 'true' })
		} else if (watchingFile && payload.username === currentUser) {
			dispatch(WatchActions.addMessageToWatchPanel({
				label: "Last change to watched file:",
				text: `You changed ${payload.filepath} in ${payload.channel} on ${changeTime}.`
			}))
		}
	})

	socket.on('reloadTeam', channelName => {
		dispatch(TeamActions.refreshTeamMembers())
	})

	socket.on('refreshOnline', payload => {
		let currentChannel = dispatch(RepoActions.getCurrentChannel())
		if (currentChannel === payload.channelName) {
			dispatch(TeamActions.refreshOnline(payload.currentlyOnline))
		}
	})

	socket.on('reloadChannels', channelName => {
		dispatch(ChannelActions.loadChannels())
	})
}

export function stopSockets() {
	if (socket) {
		socket.removeAllListeners()
		socket.disconnect()
	}
}

export function getOnline(channelName) {
	socket.emit('getOnline', channelName)
}

export function sendChat(message, currentUser, channelName) {
	socket.emit('sendChat', { message, currentUser, channelName })
}
