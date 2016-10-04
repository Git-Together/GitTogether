import storage from 'electron-json-storage'
const { BrowserWindow } = require('electron').remote
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_USER = "SET_USER"

export function setUser(currentUser, token) {
	storage.set('user', {
		currentUser: currentUser,
		token: token
	}, err => console.error)
	return {
		type: SET_USER,
		currentUser,
		token
	}
}

export function login() {
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
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						code: code
					})
				}

				let token, username
				return fetch('http://localhost:1337/api/auth/github', fetchRequest)
					.then(r => r.json())
					.then(response => {
							console.log(response)
							dispatch(setUser(response.username, response.token))
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
		dispatch(setUser(null, null))
	}
}
