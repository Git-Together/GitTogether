export const WATCH_FILE = 'WATCH_FILE';
export const UNWATCH_FILE = 'UNWATCH_FILE';
export const CHANGE_ACTIVE_WATCH = "CHANGE_ACTIVE_WATCH";
export const RESET_WATCH = "RESET_WATCH";
export const GET_ALL_WATCH = "GET_ALL_WATCH";
export const ADD_MESSAGE_TO_WATCH_PANEL = 'ADD_MESSAGE_TO_WATCH_PANEL';
import axios from 'axios';
import * as FileActions from './file-actions.js';

export function addMessageToWatchPanel(message){
    return{
        type: ADD_MESSAGE_TO_WATCH_PANEL,
        message
    }
}

export function watchFile(repoId, fileName) {
	return (dispatch, getState) => {
		const state = getState()
		var payload = {
			fileName: fileName,
			repoId,
			userId: state.auth.id
		};
		axios.post(process.env.SERVER_URL + '/api/files/', payload)
			.then(fileWatch => {
				dispatch({
					type: WATCH_FILE,
					repoId: repoId,
					fileId: fileName,
					userId: state.auth.id
				})
			})
	}
}

export function unwatchFile() {
	return (dispatch, getState) => {
		let repoId = getState().repos.activeRepoId;
		let fileName = getState().watch.activeWatch;
		var payload = {
			data: {
				fileName,
				repoId,
				userId: getState().auth.id
			}
		};

		axios.delete(process.env.SERVER_URL + '/api/files/', payload)
			.then(() => {
				dispatch({
					type: UNWATCH_FILE,
					repoId,
					fileName,
					userId: getState().auth.id
				})
			})
			.catch(console.error)
	}

}

export function changeActiveWatch(fileId) {
	return {
		type: CHANGE_ACTIVE_WATCH,
		fileId
	}

}

export function getWatch() {
	return (dispatch, getState) => {
		let userId = getState().auth.id;
		let watchList = [];
		let channelName = getState().repo.channelName;
		let watchArray = [];
		axios.get(process.env.SERVER_URL + '/api/files/?userId=' + userId)
			.then((watchFileList) => {
				watchFileList.data.forEach((e) => {
					if (e.users.some(j => j.id === userId)) {

						watchArray.push(e)
					}
				})
			})
			.then(() => {
				return dispatch({
					type: GET_ALL_WATCH,
					watchList: watchArray
				})

			})
			.catch(console.error)

	}
}

export function getWatchFiles() {
	return (dispatch, getState) => {
		return getState().watch.watch
	}
}

export function changeActiveWatchAsync(fileId){
	let fileName = '/' + fileId;
	return (dispatch) => {
		dispatch(changeActiveWatch(fileId))
		dispatch(FileActions.getFileChanges(fileName))
	}
}
