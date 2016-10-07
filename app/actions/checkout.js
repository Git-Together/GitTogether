export const CHECKOUT_FILE = 'CHECKOUT_FILE';
export const RETURN_FILE = 'RETURN_FILE';
import axios from 'axios';
// export function checkoutFile(repoName, fileId, userName) {
//   return {
//     type: CHECKOUT_FILE,
//     repoName,
//     fileId,
//     userName
//   };
// }

//state.auth.userId

export function checkoutFile(repoId, branchId, fileId) {

  return (dispatch, getState) => {

    var payload = {
      fileName: fileId,
      repoId,
      branchId,
      userId: getState().auth.userId
    };

    axios.post('https://localhost:1337/api/file', payload)
      .then(fileWatch => {
        console.log("This is the return for fileWatch: ", fileWatch)
      })



  }


}

// export function getRepoTree(repo){

//   return (dispatch, getState) => {
//     axios.get(`https://api.github.com/repos/${repo.full_name}/git/refs/?access_token=${getState().auth.token}`)
//       .then(repoSha => {
//         console.log('repoSha', repoSha.data);
//         return axios.get(`https://api.github.com/repos/${repo.full_name}/git/trees/${repoSha.data[0].object.sha}?recursive=1&access_token=${getState().auth.token}`);
//       }).then(tree => dispatch({
//         type: SWITCH_ACTIVE_TREE,
//         tree
//       })).then(() => dispatch({
//         type: SWITCH_ACTIVE_REPO,
//         id: repo.id
//       })).then(() => dispatch({
//           type: TOGGLE_COMPONENT,
//           component: 'Repo View'
//     }))
//   }
// }



export function returnFile(repoName, fileId, userName){
  return {
    type: RETURN_FILE,
    repoName,
    fileId,
    userName
  }
}
