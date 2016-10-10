import gaze from 'gaze';
import io from 'socket.io-client'
//TOCHANGE: connecting socket to local host for testing for the time being—wire to server once ready
const socket = io.connect(process.env.SOCKET_URL);
import git from 'simple-git';
import Promise from 'bluebird';
const storage = Promise.promisifyAll(require('electron-json-storage'))
import { logParser, diffParser } from './git-command-parsers.js';
//for information about these functions, see reference at the top of './git-command-parsers.js'

//Iterate through the user's repos and set up a watcher for each one.
export function fileWatcher() {
	let	channels = []
	let repoPaths = []
	let username;

	return storage.getAsync('user')
		.then(info => {
			username = info.currentUser
		})
		.then(() => {
			return storage.getAsync('channels') 
		})
		.then(cachedChannels => {
			for (var channel in cachedChannels[username]) {
				if (cachedChannels[username][channel]) {
					channels.push(channel)
					repoPaths.push(cachedChannels[ username ][channel])
				}
			}
		})
		.then(() => {
			channels.forEach((channel, index) => {
				let repoPath = repoPaths[index]
				gaze('**/*', {
					//Don't watch npm packages in a repo—it's prohibitively expensive and they shouldn't be
					//doing anything in there anyway.
					cwd: repoPath,
					ignore: ['**/node_modules/**', 'node_modules/**']
				}, function(err, watcher) {
					var watched = this.watched()
					this.on('ready', function() {
						console.log('filewatcher watching')
					})

					//'All' will fire the callback if any files are changed, added, or deleted.
					this.on('all', function (event, filepath) {
						let payload = { event, channel, username }
						//Check to see if the gaze trigger was a file being added.
						//This can cut down on some logic downstream, because
						//other people couldn't be watching a file that was just created.

						let pathRegex = new RegExp( repoPath + '(\\S*)', 'g')
						let revisedPath = pathRegex.exec(filepath)[1]
						payload.filepath = revisedPath

						git(repoPath)
							.branch( (err, result) => {
								if (err) {
									console.log(err)
									payload.branch = {
									}
								} else {
									payload.branch = result
								}

								//adds a 'branch' property to the payload object,
								//with the value:
								//	{
								//		detached: BOOL,
								//		current: STRING indicating current branch,
								//		all: ARRAY of branch names (as STRINGS)
								//		branches: OBJ with a key for each branch,
								//			each with the format:
								//			{
								//				current: BOOL,
								//				name: STRING,
								//				commit: STRING,
								//				label: STRING (most recent commit msg)
								//			}
								//	}
							})
							.log(['--oneline'], (err, logReadout) => {
								if (err) {
									console.log(err)
								} else {
									payload.log = logParser(logReadout)
								}

								//adds a 'log' property to the payload object,
								//with the value:
								//	[ [hash for commit, commit msg], [hash for commit, commit msg], etc.]
							})
							.diff((err, diffReadout) => {
								if (err) {
									console.log(err)
									payload.diff ={
									}
								} else {
									payload.diff = diffParser(diffReadout)
								}

								//adds a 'diff' property to the payload object,
								//with the value:
								//	{
								//		(first filename): ARR of ARRS, each with format:
								//			[INT for line # where changes start, INT for line where changes end],
								//		(second filename): ARR of ARRS, etc.
								//	}
							})
							.then(() => {
								console.log(payload)
								socket.emit('fileChanges', payload)
								return
							})
					})
				})
			})
		})
		.catch(err => console.error)
 	//Logic for handling incoming socket events—this may need to be moved to
	//a parent react component.
}
