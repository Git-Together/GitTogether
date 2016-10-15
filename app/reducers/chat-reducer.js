import { POST_MESSAGE, REFRESH_MESSAGES, CHANGE_ACTIVEMESSAGE } from '../actions/chat-actions';

const initialState = {
  activeMessage: 1,
  messages: [{
    message: 'This is the initial message',
    userId: 1,
    id: 1,
    timeStamp: new Date()
  },
  {
    message: 'This is the second message',
    userId: 2,
    id: 2,
    timeStamp: new Date()
  }],
  icon: 'glyphicon glyphicon-comment',
  panelMessageArray: [
      {
        label: "Here is the Conversation",
        text: ""
      }
    ],
  panelMessagePlayIndex: 0,
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return { ...state, messages: [...state.messages, {message: action.message, userId: action.userId, id: action.id, timeStamp: action.timeStamp}] };
    case REFRESH_MESSAGES:
      return { ...state, messages: [...action.messages] };
    case CHANGE_ACTIVEMESSAGE:
      return { ...state, activeMessage: action.id };
    default:
      return state;
  }
}
