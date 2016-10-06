export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export function addChannel(channel) {
  return {
    type: ADD_CHANNEL,
    channel
  }
}

export function removeChannel(id) {
  return {
    type: REMOVE_CHANNEL,
    id
  }
}
