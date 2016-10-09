import { CHANGE_ACTIVE_FILE, REFRESH_FILES, GET_FILE_CHANGES } from '../actions/files';

const initState = {
  activeFile: 1,
  activeEvents: {},
  files: [
    {
      fileName: 'Milad.txt',
      lastUpdated: new Date(),
      id: 1
    },
    {
      fileName: 'Kin.txt',
      lastUpdated: new Date(),
      id: 2
    },
    {
      fileName: 'Gil.txt',
      lastUpdated: new Date(),
      id: 3
    },
    {
      fileName: 'app.js',
      lastUpdated: new Date(),
      id: 4
    },
  ]
}

function activeFile(state = 1, action){
  switch (action.type) {
    case CHANGE_ACTIVE_FILE:
      if (action.id) return action.id
      return action.name
    default:
      return state
  }
}

export default function files(state = initState, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_FILE:
      return {...state, activeFile: activeFile(state.activeFile, action)};
    case REFRESH_FILES:
      return {...state, files: action.files};
    case GET_FILE_CHANGES:
      return {...state, activeEvents: action.fileChanges};
    default:
      return state;
  }
}
