export const POST_MESSAGE = 'POST_MESSAGE';
export const REFRESH_MESSAGES = 'REFRESH_MESSAGES';
export const CHANGE_ACTIVEMESSAGE = 'CHANGE_ACTIVEMESSAGE';

// creates an action to post message
export function postMessage(message, userId, postId) {
  return {
    type: POST_MESSAGE,
    message,
    userId,
    postId,
    timeStamp: new Date()
  };
}

// creates an action to refresh messages
export function refreshMessages(messages) {
  return {
    type: REFRESH_MESSAGES,
    messages
  };
}

export function changeActiveMessage(id) {
  return {
    type: CHANGE_ACTIVEMESSAGE,
    id
  };
}
