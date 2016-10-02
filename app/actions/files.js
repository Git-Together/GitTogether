export const CHANGE_ACTIVE_FILE = 'CHANGE_ACTIVE_FILE'
export const REFRESH_FILES = 'REFRESH_FILES'

export function changeActiveFile(id) {
  return {
    type: CHANGE_ACTIVE_FILE,
    id
  }
}

export function refreshFiles(files) {
  return {
    type: REFRESH_FILES,
    files
  }
}
