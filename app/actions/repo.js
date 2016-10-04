export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const SWITCH_ACTIVE_REPO = 'SWITCH_ACTIVE_REPO';
export const GET_USER_REPOS = 'GET_USER_REPOS';

//Github API call
import GitHub from 'github-api';

export default function getUserRepos() {

  return dispatch => {
    const gh = new GitHub({});

    const ghAccountName = gh.getUser('kintsang');

    ghAccountName.listRepos()
        .then(repos => dispatch({
          type: GET_USER_REPOS,
          repos
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

export function switchActive(id){
  return {
    type: SWITCH_ACTIVE_REPO,
    id
  }
}
