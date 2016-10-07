export const CHANGE_ACTIVE_FILE = 'CHANGE_ACTIVE_FILE'
export const REFRESH_FILES = 'REFRESH_FILES'
export const GET_FILE_CHANGES = 'GET_FILE_CHANGES';
import {TOGGLE_COMPONENT} from './ui'
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

export function changeActiveFileAsync(id, fileName){
  return (dispatch, getState) =>{
    //Change active file
    dispatch(changeActiveFile(id, fileName));
    dispatch(getFileChanges(fileName));
    dispatch({
          type: TOGGLE_COMPONENT,
          component: 'FileView'
    })
  }
}


// Get last 10 files changes for the given file, ordered.
// TODO: ROUTE NOT YET CREATED
export function getFileChanges(name) {
  return (dispatch, getState) => {
  name = name.split('/').join('*');  
  console.log('STATE', getState());
	// axios.get(`https://our-git.herokuapp.com/api/files/${name}?repoId=${getState().repo.activeRepo}`)
	axios.get(`http://localhost:1337/api/files/${name}?repoId=${getState().repo.activeRepo}`)
    .then(fileChanges => {
      console.log('FILE CHANGES', fileChanges);
      dispatch({
          type: GET_FILE_CHANGES,
          fileChanges
      })
    });
  };
}
