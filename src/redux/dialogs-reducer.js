const ADD_POST_DIALOGS = 'dialogs/ADD-POST-DIALOGS';
let initialState = {
	contacts: [
		{name: 'Stephen', id: 1},
		{name: 'Draymond', id: 2},
		{name: 'Jonathan', id: 3},
		{name: 'Klay', id: 4},
	],
	texts: [
		{content: 'Good morning', id: 1},
		{content: 'How do you feel?', id: 2},
		{content: 'Will you play PS5 with me?', id: 3},
	],
};
const dialogs_reducer = (_state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_DIALOGS:
			let newPost = {content: action.text, likeNumber: Math.floor(Math.random() * 10)};
			return {..._state, texts: [..._state.texts, newPost]};
		default:
			return _state;
	}
};
const addMessage = (text) => ({type: ADD_POST_DIALOGS, text});
export {dialogs_reducer, addMessage} ;
