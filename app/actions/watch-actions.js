export const WATCH_FILE = 'WATCH_FILE';
export const UNWATCH_FILE = 'UNWATCH_FILE';
export const CHANGE_ACTIVE_WATCH = "CHANGE_ACTIVE_WATCH";
export const RESET_WATCH = "RESET_WATCH";
export const GET_ALL_WATCH = "GET_ALL_WATCH";
import axios from 'axios';

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

export function unwatchFile(repoId, fileId) {

	return (dispatch, getState) => {

		var payload = {
			data: {
				fileName: name,
				repoId,
				userId: getState().auth.id}

		};

		axios.delete(process.env.SERVER_URL + '/api/files/', payload)
			.then(() => {
				dispatch({
					type: UNWATCH_FILE,
					repoName: repoId,
					fileId,
					userId: getState().auth.id
				})
			})
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
    console.log("ChannelName and userId", channelName, userId)
		axios.get(process.env.SERVER_URL + '/api/files/?userId=' + userId)
			.then((watchFileList) => {

				watchFileList.data.forEach((e) => {
					if (e.repoId === channelName && e.users.some(j => j.id === userId)) {
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

