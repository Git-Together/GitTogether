import { CHANGE_ACTIVE_FILE, REFRESH_FILES, GET_FILE_CHANGES } from '../actions/file-actions';

const initState = {
  activeFileId: "",
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
    }
  ],
  icon: 'glyphicon glyphicon-file',
   panelMessageArray: [
      {
        label: "Here are your Files",
        text: "file"
     }
  ],
  panelMessagePlayIndex: 0,
  activeEvents: {}
};

function activeFile(state = 1, action){
  switch (action.type) {
    case CHANGE_ACTIVE_FILE:
      if (action.id) return action.id
      return action.name
    default:
      return state
  }
}

export default function file(state = initState, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_FILE:
      return {...state, activeFileId: activeFile(state.activeFile, action)};
    case REFRESH_FILES:
      return {...state, files: action.files};
    case GET_FILE_CHANGES:
      return {...state, activeEvents: action.fileChanges};
    default:
      return state;
  }
}
