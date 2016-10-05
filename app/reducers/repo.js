
import { ADD_REPO, REMOVE_REPO, SWITCH_ACTIVE_REPO, GET_USER_REPOS, SWITCH_ACTIVE_TREE } from '../actions/repo';

const initState =
  {
    activeRepo: 1,
    repos: [{
      type: 'document',
      name: 'ourGit',
      id: 1
    },
    {
      type: 'folder',
      name: 'GitIt',
      id: 2,
      repos: [
        {
          type: 'document',
          name: 'GitItOn',
          id: 4
        },{
          type: 'folder',
          name: 'GitFolder',
          id: 5,
          repos: [
            {
              type: 'document',
              name: 'GitWhaaat',
              id: 6,
            }
          ]
        }
      ]
    },
    {
      type: 'document',
      name: 'GitOffMe',
      id: 3
    }],
    tree: {}
  };

export default function repo(state = initState, action) {
  switch (action.type) {
    case ADD_REPO:
      // let id = ++state.map(e => e.id)[state.length - 1];
      // let newRepo = {...action.repo, id: id }
      // return [...state, newRepo];
      // Deep clone state, add new repo to repos array
      action.repo.id = state.repos.map(e => e.id).reduce((e, cur) => {
        return Math.max(e, cur);
      })
      action.repo.id++;
      return {...state, repos: [...state.repos, action.repo]}
    case REMOVE_REPO:
      let idx = state.repos.map(repo => repo.id).indexOf(action.id);
      if (idx === -1) return state;
      return {...state, repos: [...state.repos.slice(0, idx), ...state.repos.slice(idx + 1)]};
    case SWITCH_ACTIVE_REPO:
      return {...state, activeRepo: action.id};
    case GET_USER_REPOS:
      return {...state, repos: action.repos.data};
    case SWITCH_ACTIVE_TREE:
      return {...state, tree: action.tree.data};
    default:
      return state;
  }
}
