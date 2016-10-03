import { ADD_REPO, REMOVE_REPO } from '../actions/repo';

const initState =
  [
    {
      name: 'ourGit',
      id: 1
    },
    {
      name: 'Not ourGit',
      id: 2
    },
    {
      name: 'Really not ourGit',
      id: 3
    },
  ]
;

export default function repo(state = initState, action) {
  switch (action.type) {
    case ADD_REPO:
      let id = ++state.map(e => e.id)[state.length-1];
      let newRepo = {...action.repo, id:id}
      return [...state, newRepo];
    case REMOVE_REPO:
      let idx = state.map(e => e.id).indexOf(action.id);
      if (idx === -1) return state;
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    default:
      return state;
  }
}
