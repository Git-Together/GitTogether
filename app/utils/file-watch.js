import gaze from 'gaze';
import storage from 'electron-json-storage';
//TOCHANGE: connecting socket to local host for testing for the time being—wire to server once ready
const socket = io.connect('http://localhost:3030');
import git from 'simple-git';
import Promise from 'bluebird';
import { logParser, diffParser } from './git-command-parsers.js';
//for information about these functions, see reference at the top of './git-command-parsers.js'

let repoPaths;
//TOCHANGE: once we've integrated local storage of a user's channels, use the logic below
//
//storage.get('repos', ( err, data ) => {
//	if (err) {
//		console.error(err)
//		return;
//	}
//
//	repoPaths = data
//})

//TOCHANGE: for the time being, using this to watch files in this directory:
repoPaths = ['**/*']


//Iterate through the user's repos and set up a watcher for each one.
repoPaths.forEach(path => {

	gaze(path, {
		//Don't watch npm packages in a repo—it's prohibitively expensive and they shouldn't be
		//doing anything in there anyway.
		ignore: ['node_modules/**']
	}, function(err, watcher) {
		//'All' will fire the callback if any files are changed, added, or deleted.
		this.on('all', function() {
			let payload = {}

			git(path)
				.branch( (err, result) => {
					if (err) {
						console.error(err)
						return
					}

					payload.branch = result
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
						console.error(err)
						return
					}

					payload.log = logParser(logReadout)
					//adds a 'log' property to the payload object,
					//with the value:
					//	[ [hash for commit, commit msg], [hash for commit, commit msg], etc.]
				})
				.diff( (err, diffReadout) => {
					if (err) {
						console.error(err)
						return
					}

					payload.diff = diffParser(diffReadout)
					//adds a 'diff' property to the payload object,
					//with the value:
					//	{
					//		(first filename): ARR of ARRS, each with format:
					//			[INT for line # where changes start, INT for line where changes end],
					//		(second filename): ARR of ARRS, etc.
					//	}
				})
				.then(() => {
					socket.emit('fileChanges', payload)
				})

		})
	})

})
