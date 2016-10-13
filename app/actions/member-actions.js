export const CHANGE_ACTIVE_MEMBER = 'CHANGE_ACTIVE_MEMBER';


// export function toggleComponent(component) {
//   return {
//     type: TOGGLE_COMPONENT,
//     component
//   };
// }

export function changeActiveMember(id) {
	return {
		type: CHANGE_ACTIVE_MEMBER,
		id
	};
}


