
<<<<<<< HEAD
import { CHANGE_CHANNEL_PATH, ADD_REPO, REMOVE_REPO, SWITCH_ACTIVE_REPO, GET_USER_REPOS, SWITCH_ACTIVE_TREE } from '../actions/repo';
||||||| merged common ancestors
import { ADD_REPO, REMOVE_REPO, SWITCH_ACTIVE_REPO, GET_USER_REPOS, SWITCH_ACTIVE_TREE } from '../actions/repo';
=======
import { ADD_REPO, REMOVE_REPO, SWITCH_ACTIVE_REPO, GET_USER_REPOS, SWITCH_ACTIVE_TREE, GET_COLLABORATORS } from '../actions/repo';
>>>>>>> b4ea0b98a174f9e343548d0fd9b633f0b27bab51

const initState =
  {
    activeRepo: 1,
	channelName: 'none',
	channelPath: null,
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
    tree: {},
    activeRepoCollaborators: []
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
      return {...state, activeRepo: action.id, channelName: action.name};
    case GET_USER_REPOS:
      return {...state, repos: action.repos};
    case SWITCH_ACTIVE_TREE:
      return {...state, tree: action.tree.data};
<<<<<<< HEAD
	case CHANGE_CHANNEL_PATH:
	  return {...state, channelPath: action.path};
||||||| merged common ancestors
=======
    case GET_COLLABORATORS:
      return {...state, activeRepoCollaborators: action.collaborators};
>>>>>>> b4ea0b98a174f9e343548d0fd9b633f0b27bab51
    default:
      return state;
  }
}
