export const CHANGE_ACTIVE_MEMBER = 'CHANGE_ACTIVE_MEMBER';
export const ADD_MESSAGE_TO_MEMBER_PANEL = 'ADD_MESSAGE_TO_MEMBER_PANEL';


// export function toggleComponent(component) {
//   return {
//     type: TOGGLE_COMPONENT,
//     component
//   };
// }

export function addMessageToMemberPanel(message){
    return {
        type: ADD_MESSAGE_TO_MEMBER_PANEL,
        message
    }
}

export function changeActiveMember(id) {
	return {
		type: CHANGE_ACTIVE_MEMBER,
		id
	};
}


