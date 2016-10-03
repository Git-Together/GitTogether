import { CHANGE_ACTIVE_BRANCH, REFRESH_BRANCHES } from '../actions/branch';

const initState = {
  activeBranch: 1,
  branches: [
    {
      branchName: 'Milad',
      lastUpdated: new Date(),
      id: 1,
      local: true
    },
    {
      branchName: 'Kin',
      lastUpdated: new Date(),
      id: 2,
      local: true
    },
    {
      branchName: 'Gil',
      lastUpdated: new Date(),
      id: 3,
      local: false
    },
    {
      branchName: 'Ten',
      lastUpdated: new Date(),
      id: 4,
      local: false
    },
  ]
}

function activeBranch(state = 1, action){
  switch (action.type) {
    case CHANGE_ACTIVE_BRANCH:
      return action.id
    default:
      return state
  }
}

export default function branches(state = initState, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_BRANCH:
      return {...state, activeBranch: activeBranch(state.activeBranch, action)};
    case REFRESH_BRANCHES:
      return {...state, branches: action.branches};
    default:
      return state;
  }
}
