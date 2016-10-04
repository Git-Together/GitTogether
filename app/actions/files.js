export const CHANGE_ACTIVE_FILE = 'CHANGE_ACTIVE_FILE'
export const REFRESH_FILES = 'REFRESH_FILES'
import {TOGGLE_COMPONENT} from './ui'

export function changeActiveFile(id) {
  return {
    type: CHANGE_ACTIVE_FILE,
    id
  }
}

export function refreshFiles(files) {
  return {
    type: REFRESH_FILES,
    files
  }
}

export function changeActiveFileAsync(fileName){
  console.log('FileName', fileName);
  return (dispatch) =>{
    //Change active file
    dispatch(changeActiveFile(fileName));
    dispatch({
          type: TOGGLE_COMPONENT,
          component: 'FileView'
    })
  }
}
