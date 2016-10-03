import { POST_MESSAGE, REFRESH_MESSAGES, CHANGE_ACTIVEMESSAGE } from '../actions/chat';

const initialState = {
  activeMessage: 1,
  messages: [{
    message: 'This is the initial message',
    userID: 1,
    id: 1,
    timeStamp: new Date()
  },
  {
    message: 'This is the second message',
    userID: 2,
    id: 2,
    timeStamp: new Date()
  }]
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    case REFRESH_MESSAGES:
      return { ...state, messages: [...action.messages] };
    case CHANGE_ACTIVEMESSAGE:
      return { ...state, activeMessage: action.id };
    default:
      return state;
  }
}
