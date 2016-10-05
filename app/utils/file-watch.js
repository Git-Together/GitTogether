import gaze from 'gaze';
import storage from 'electron-json-storage';
import io from 'socket.io-client'
//TOCHANGE: connecting socket to local host for testing for the time being—wire to server once ready
const socket = io.connect('http://localhost:1337');
import git from 'simple-git';
import Promise from 'bluebird';
import { logParser, diffParser } from './git-command-parsers.js';
//for information about these functions, see reference at the top of './git-command-parsers.js'

let channels;
let repoPaths;
//TOCHANGE: once we've integrated local storage of a user's channels, use the logic below
//
//storage.get('channels', ( err, data ) => {
//	if (err) {
//		console.error(err)
//		return;
//	}
//
//	channels = data
//})
//storage.get('repoPaths', ( err, data ) => {
//	if (err) {
//		console.error(err)
//		return;
//	}
//
//	repoPaths = data
//})
//n.b.: This assumes that repos and channels will be stored in separate arrays, where
//the channel at a given index value is linked to the path at the same index value in
//repoPaths

//TOCHANGE: for the time being, using this to watch files in this directory:
channels = ['rgit-testing']
repoPaths = ['/Users/gewl/Desktop/gitclones/projects/rivers']

//Iterate through the user's repos and set up a watcher for each one.
export function fileWatcher() {
	let username;

	storage.get('user', (err, info) => {
		username = info.currentUser
	})

	channels.forEach((channel, index) => {
		let repoPath = repoPaths[index]

		gaze('**/*', {
			//Don't watch npm packages in a repo—it's prohibitively expensive and they shouldn't be
			//doing anything in there anyway.
			cwd: repoPath,
			ignore: ['**/node_modules/**', 'node_modules/**']
		}, function(err, watcher) {
			var watched = this.watched()
			console.log(watched)
			this.on('ready', function() {
				console.log('filewatcher watching' + repoPaths)
			})
			//TOCHANGE: To avoid giving other users the emitting user's file structure,
			//going to need to isolate filepath relative to repo directory.
			//
			//let pathRegex = new RegExp( repoPath + '([\\s\\S]*)', 'g')

			//'All' will fire the callback if any files are changed, added, or deleted.
			this.on('all', function(event, filepath) {
				console.log('file changed')
				let payload = { event, channel, username }
				//Check to see if the gaze trigger was a file being added.
				//This can cut down on some logic downstream, because
				//other people couldn't be watching a file that was just created.
				let fileAdded = false

				//TOCHANGE: once repo paths are being stored, add this bit
				//let revisedPath = pathRegex.exec(filepath)
				payload.filepath = filepath

				if (event === "added") fileAdded = true
				payload.fileAdded = fileAdded

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
					.diff( (err, diffReadout) => {
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
					})
			})
		})
	})

	//Logic for handling incoming socket events—this may need to be moved to
	//a parent react component.

	socket.on('fileChanges', payload => {
		let channels
		storage.get('channels', (err, data) => {
			if (err) {
				console.error(err)
				return
			}

			channels = data
		})

		if (channels.includes(payload.channel)) {
			new Notification(payload.githubName + ' is editing ' + payload.filepath + ' in ' + payload.branch.current + '.')
		}
	})
}
