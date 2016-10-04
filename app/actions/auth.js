import storage from 'electron-json-storage'
const { BrowserWindow } = require('electron').remote
import GitHub from 'github-api'
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_USER = "SET_USER"

let gh;

export function setUser(currentUser, token) {
	let storageObj = { currentUser, token }
	return storage.set('currentUser', storageObj, (err, result) => {
		return {
			type: SET_USER,
			currentUser,
			token
		}
	})
}

export function login() {
	console.log('hi')
	console.log(process.env.CLIENT_ID)
	return function(dispatch, getState) {
		let options = {
			client_id: process.env.CLIENT_ID
		}

		let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false })
		let githubUrl = 'https://github.com/login/oauth/authorize?' 
		let authUrl = githubUrl + 'client_id=' + options.client_id 
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
					body: {
						code: code
					}
				}

				let token, username
				return fetch(process.env.SERVER_URL + '/api/auth/github', fetchRequest)
					.then(
						response => {
						 	token = response.token
							console.log(token)
							gh = new GitHub({
								token: token
							})
							return gh.getUser()
						},
						err => console.error(err)
					)
					.then(
						githubUser => {
							username = githubUser.login
							console.log(username)
							dispatch(setUser(username, token))
						},
						err => console.error(err)
					)

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
		dispatch(setUser(null, null))
	}
}
