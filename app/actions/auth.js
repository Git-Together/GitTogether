import storage from 'electron-json-storage'
const { BrowserWindow } = require('electron').remote
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_USER = "SET_USER"
import { push } from 'react-router-redux'
import io from 'socket.io-client';

import GitHub from 'github-api';
import axios from 'axios';

export function setUser(currentUser, token, id) {
	var channelStorage
	storage.set('user', {
		currentUser: currentUser,
		token: token,
		id: id
	}, err => console.error)
	if (currentUser) {
		let socket = io(process.env.SOCKET_URL)
		socket.emit('passLogin', currentUser)
		socket.on('fileChanges', payload => {
			console.log('PAYLOAD', payload);
			let channels
			storage.get('channels', (err, cachedChannels) => {
				if (err) {
					console.error(err)
					return
				}

				let channels = Object.keys(cachedChannels[currentUser])
				if (channels.includes(payload.channel)) {
					new Notification(payload.username + ' just ' + payload.event + " " + payload.filepath + ' in ' + payload.branch.current + '.')
				}
			})
			
		})
		storage.get('channels', (err, result) => {
			if (err) {
				console.error(err)
				channelStorage = {}
			}

			channelStorage = result
		})

		return (dispatch, getState) => {
			axios.get(process.env.SERVER_URL + `/api/users/${id}`)
			// axios.get(`http://localhost:1337/api/users/${id}`)
				.then(result => {
					let user = result.data
					let userStorage = channelStorage[currentUser] ? channelStorage[ currentUser ] : {}
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
				})
				.then(() => dispatch({
					type: SET_USER,
					currentUser,
					token,
					id
				}))
		}
	} else {
		return {
			type: SET_USER,
			currentUser,
			token,
			id
		}
	}
}

export function login() {
	return function(dispatch, getState) {
		let options = {
			client_id: process.env.CLIENT_ID,
			scopes: ['repo']
		}

		let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false })
		let githubUrl = 'https://github.com/login/oauth/authorize?'
		let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
		authWindow.loadURL(authUrl)
		authWindow.show()

		function handleCallback (url) {
			var raw_code = /code=([^&]*)/.exec(url) || null;
			var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
			var error = /\?error=(.+)$/.exec(url);

			if (code || error) {
				authWindow.destroy();
			}

			if (code) {
				let fetchRequest = {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						code: code
					})
				}

				return fetch(process.env.SERVER_URL + '/api/auth/github', fetchRequest)
				// return fetch('http://localhost:1337/api/auth/github', fetchRequest)
					.then(r => r.json())
					.then(response => {
						dispatch(setUser(response.username, response.token, response.id))
					})

			} else if (error) {
				alert('Oops! Something went wrong and we couldn\'t' +
					'log you in using Github. Please try again.');
				return {}
			}
		}

		authWindow.webContents.on('will-navigate', function (event, url) {
			handleCallback(url);
		});

		authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
			handleCallback(newUrl);
		});
	}
}

export function logout(githubUsername) {
	return function(dispatch, getState) {
		dispatch(setUser(null, null, null))
		dispatch(push('/'))
	}
}
