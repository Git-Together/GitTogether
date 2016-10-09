export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';
export const SWITCH_ACTIVE_REPO = 'SWITCH_ACTIVE_REPO';
export const GET_USER_REPOS = 'GET_USER_REPOS';
export const SWITCH_ACTIVE_TREE = 'SWITCH_ACTIVE_TREE';
export const GET_COLLABORATORS = 'GET_COLLABORATORS';

//Github API call
import GitHub from 'github-api';
import axios from 'axios';
import { TOGGLE_COMPONENT } from './ui'

export function getUserRepos() {
  return (dispatch, getState) => {
	axios.get(`https://api.github.com/user/repos?affiliation=owner,collaborator&per_page=100&access_token=${getState().auth.token}`)
    .then(repos => dispatch({
          type: GET_USER_REPOS,
          repos: repos.data
    }));
  };
}

export function getRepoTree(repo){
  return (dispatch, getState) => {
	let repoId;
  let fetchedRepo;
	axios.get(`https://api.github.com/repos/${repo}?access_token=${getState().auth.token}`)
		  .then(fetched => {
        fetchedRepo = fetched
        console.log("fetchedRepo", fetchedRepo)
			  repoId = fetchedRepo.data.id
			  return axios.get(`https://api.github.com/repos/${repo}/git/refs/?access_token=${getState().auth.token}`)
		  })
		  .then(repoSha => {
			  console.log('repoSha', repoSha.data);
			  return axios.get(`https://api.github.com/repos/${repo}/git/trees/${repoSha.data[0].object.sha}?recursive=1&access_token=${getState().auth.token}`);
		  }).then(tree => {
			  console.log('tree ', tree)
			  dispatch({
			  type: SWITCH_ACTIVE_TREE,
			  tree
		  })}).then(() => dispatch({
			  type: SWITCH_ACTIVE_REPO,
			  id: repoId,
			  name: repo
		  })).then(() => dispatch({
			  type: TOGGLE_COMPONENT,
			  component: 'Repo View'
		  })).then(() => {
        console.log("fetchedRepo BEFORE WE DO COLLAB CALL", fetchedRepo)
        axios.get(`https://api.github.com/repos/${repo}/collaborators?access_token=${getState().auth.token}`)
        .then(collaborators => {
          console.log("collabs from axios:", collaborators)
            dispatch({
             type: GET_COLLABORATORS,
              collaborators: collaborators.data.map(e => e.login)
            })
        })
    })
  }
}

export function addRepo(repo) {
	return {
		type: ADD_REPO,
		repo
	};
}

export function removeRepo(id) {
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
