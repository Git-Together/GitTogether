export const CHANGE_ACTIVE_FILE = 'CHANGE_ACTIVE_FILE'
export const REFRESH_FILES = 'REFRESH_FILES'
export const GET_FILE_CHANGES = 'GET_FILE_CHANGES';
import { TOGGLE_COMPONENT } from './ui-actions'
import axios from 'axios';

export function changeActiveFile(id, name) {
  return {
    type: CHANGE_ACTIVE_FILE,
    id,
    name
  }
}

export function refreshFiles(files) {
  return {
    type: REFRESH_FILES,
    files
  }
}

export function changeActiveFileAsync(id){
  let fileName = '/' + id;
  return (dispatch, getState) =>{
    //Change active file
    dispatch(changeActiveFile(id, fileName))
    dispatch(getFileChanges(fileName))
  }
}


// Get last 10 files changes for the given file, ordered.
export function getFileChanges(name) {
  return (dispatch, getState) => {
  name = name.split('/').join('*');
  let channelName = getState().repo.channelName.split('/').join('*');
	axios.get(process.env.SERVER_URL + `/api/files/${name}?repoId=${channelName}`)
	// axios.get(`http://localhost:1337/api/files/${name}?repoId=${channelName}`)
    .then(fileChanges => {
      console.log('FILECHANGES', fileChanges);
      dispatch({
          type: GET_FILE_CHANGES,
          fileChanges: fileChanges.data
      })
    });
  };
}
