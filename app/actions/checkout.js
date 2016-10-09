export const CHECKOUT_FILE = 'CHECKOUT_FILE';
export const RETURN_FILE = 'RETURN_FILE';
import axios from 'axios';

export function checkoutFile(repoId, fileId) {

  return (dispatch, getState) => {

    var payload = {
      fileName: fileId,
      repoId,
      userId: getState().auth.id
    };
// process.env.SERVER_URL + `/api/users/${id}`
    axios.post(process.env.SERVER_URL + '/api/files/', payload)
      .then(fileWatch => {
        dispatch({
          type: CHECKOUT_FILE,
          repoName: repoId,
          fileId,
          userId: getState().auth.id
        })
      })
  }
}

export function unsubscribe(repoId, fileId) {

  return (dispatch, getState) => {

    var payload = {
      data: {
        fileName: fileId,
        repoId,
        userId: getState().auth.id}

    };

    axios.delete(process.env.SERVER_URL + '/api/files/', payload)
    .then(() => {
      dispatch({
        type: RETURN_FILE,
          repoName: repoId,
          fileId,
          userId: getState().auth.id
      })
    })
  }
}
