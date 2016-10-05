export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const SWITCH_ACTIVE_REPO = 'SWITCH_ACTIVE_REPO';
export const GET_USER_REPOS = 'GET_USER_REPOS';
export const SWITCH_ACTIVE_TREE = 'SWITCH_ACTIVE_TREE';

//Github API call
import GitHub from 'github-api';
import axios from 'axios';
export function getUserRepos() {

  return dispatch => {
    const gh = new GitHub({});

    const ghAccountName = gh.getUser('kintsang'); //TODO: update userName to actual user.

    ghAccountName.listRepos()
        .then(repos => dispatch({
          type: GET_USER_REPOS,
          repos
        }));
  }
}

export function getRepoTree(repo){

  return dispatch => {
    axios.get('https://api.github.com/repos/' + repo.full_name + '/git/refs/')
      .then(repoSha => {
        console.log('repoSha', repoSha.data);
        return axios.get('https://api.github.com/repos/' + repo.full_name + '/git/trees/' + repoSha.data[0].object.sha + '?recursive=1');
      }).then(tree => dispatch({
        type: SWITCH_ACTIVE_TREE,
        tree
      })).then(() => dispatch({
        type: SWITCH_ACTIVE_REPO,
        id: repo.id
      }));

  }
}

export function addRepo(repo) {
    return {
        type: ADD_REPO,
        repo
    };
}

export function removeRepo(id) {
    console.log("running removeRepo");
    return {
        type: REMOVE_REPO,
        id
    };
}


//NOTE: THIS IS NOW INCLUDED WITH getRepoTree
// export function switchActive(id){
//   return {
//     type: SWITCH_ACTIVE_REPO,
//     id
//   }
// }
