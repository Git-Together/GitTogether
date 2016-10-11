export const CHANGE_ACTIVE_BRANCH = 'CHANGE_ACTIVE_BRANCH'
export const REFRESH_BRANCHES = 'REFRESH_BRANCHES'

export function changeActiveBranch(id) {
  return {
    type: CHANGE_ACTIVE_BRANCH,
    id
  }
}

export function refreshBranches(branches) {
  return {
    type: REFRESH_BRANCHES,
    branches
  }
}
