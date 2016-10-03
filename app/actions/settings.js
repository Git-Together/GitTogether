export const ADD_SETTINGS = 'ADD_SETTINGS'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const REMOVE_SETTINGS = 'REMOVE_SETTINGS'
export const REFRESH_SETTINGS = 'REFRESH_SETTINGS';

export function addSettings(setting) {
  return {
    type: ADD_SETTINGS,
    setting
  };
}

export function updateSettings(id, setting) {
  return {
    type: UPDATE_SETTINGS,
    id,
    setting
  };
}

export function removeSettings(id) {
  return {
    type: REMOVE_SETTINGS,
    id
  };
}

export function refreshSettings() {
  return {
    type: REFRESH_SETTINGS
  };
}
