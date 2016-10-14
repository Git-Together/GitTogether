import io from 'socket.io-client';
import Promise from 'bluebird';
import * as TeamActions from '../actions/team-actions.js'
import * as ChannelActions from '../actions/channel-actions.js'
import * as AuthActions from '../actions/auth-actions.js'
import * as FileActions from '../actions/file-actions.js'
import * as RepoActions from '../actions/repo-actions.js'
import axios from 'axios';

const storage = Promise.promisifyAll(require('electron-json-storage'))

let socket = null
export function instantiateSockets (state, dispatch) {
	socket = io.connect(process.env.SOCKET_URL)
	dispatch(AuthActions.socketsStarted())
	let currentUser = state.auth.currentUser
  let userId = state.auth.id
	socket.emit('passLogin', currentUser)

	socket.on('fileChanges', payload => {
		let channels
    let watchFileList = [];

    // //obtain a list of files currently watching from server
    // axios.get(process.env.SERVER_URL + `/api/files/?userId=${userId}`)
    // .then((watchList) => {
    //   console.log("watchList: ", watchList.data)
    //   watchFileList = watchList.data
    // })

		dispatch(FileActions.addMessageToFilePanel({
			label: payload.channel,
			test: payload.filepath
		}))
		// if (payload.username != currentUser) {
			storage.getAsync('channels')
				.then(cachedChannels => {
          console.log("cachedChannels from incoming-sockets.js: ",cachedChannels)

					let channels = Object.keys(cachedChannels[currentUser])

					if (channels.includes(payload.channel)) {
						new Notification(payload.username + ' just ' + payload.event + " " + payload.filepath + ' in ' + payload.channel + '.', { silent: 'true' })
					}

				})
		// } //if statement closes

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
