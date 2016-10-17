import { LOAD_MESSAGES, ADD_MESSAGE } from '../actions/chat-actions';

const initialState = {
  messages: [],
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
		case ADD_MESSAGE:
			let panelText = `${action.message.author}: ${action.message.message}`	
			return {...state, 
				messages: [...state.messages, action.message], 
				panelMessageArray: [{
					label: "Most recent message:",
					text: panelText
				}]}
		case LOAD_MESSAGES: {
			return {
				...state, 
				messages: action.chatHistory, 
				panelMessageArray: action.chatHistory[0] ? 
				[{
					label: "Most recent message:",
					text: action.chatHistory[action.chatHistory.length - 1].message
				}] : 
				[{
					label: "No messages in this channel yet.",
					text: ""
				}]
			}
		}
		default:
			return state;
	}
}
