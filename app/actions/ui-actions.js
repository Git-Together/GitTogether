// export const SHOW_DASHBOARD = 'SHOW_DASHBOARD';
// export const SHOW_REPOS = 'SHOW_REPOS';
// export const SHOW_CHAT = 'SHOW_CHAT';
// export const SHOW_TEAM = 'SHOW_TEAM';
// export const SHOW_CONVENTIONS = 'SHOW_CONVENTIONS';
// export const SHOW_BRANCHES = 'SHOW_BRANCHES';
// export const SHOW_FILEVIEW = 'SHOW_FILEVIEW';
// export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const TOGGLE_COMPONENT = 'TOGGLE_COMPONENT';
export const TOGGLE_TREE = 'TOGGLE_TREE';

export function toggleComponent(component) {
  return {
    type: TOGGLE_COMPONENT,
    component
  };
}

export function toggleTree(component) {
  return {
    type: TOGGLE_TREE,
    component
  };
}
