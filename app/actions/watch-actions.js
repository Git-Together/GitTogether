export const WATCH_FILE = 'WATCH_FILE';
export const UNWATCH_FILE = 'UNWATCH_FILE';
export const CHANGE_ACTIVE_WATCH = "CHANGE_ACTIVE_WATCH";
import axios from 'axios';

export function watchFile(repoId, fileId) {

  return (dispatch, getState) => {

    var payload = {
      fileId: fileId,
      repoName: repoId,
      userId: getState().auth.id
    };
// process.env.SERVER_URL + `/api/users/${id}`
    axios.post(process.env.SERVER_URL + '/api/files/', payload)
      .then(fileWatch => {
        dispatch({
          type: WATCH_FILE,
          repoName: repoId, //KIN SAYS DO I NEED TO CHANGE THIS TO REPO-ID?
          fileId,
          userId: getState().auth.id
        })
      })
  }
}

export function unwatchFile(repoId, name) {

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

export function changeActiveWatch(name){

    return {
        type: CHANGE_ACTIVE_WATCH,
        name
    }

}

export function getWatch(){

   return (dispatch, getState) => {
     let userId = getState().auth.id;
     let watchList = [];

     axios.get(process.env.SERVER_URL + '/api/files/?userId=' + userId)
     .then((watchFileList) => {

       watchFileList.data.forEach((e) => {

        if (e.users.length > 0 && e.users[0].id === userId) {

          dispatch({
            type: WATCH_FILE,
            repoName: e.repoId,
            fileId: e.fileName,
            userId
          })

        }


       })

     })

   }
 }
