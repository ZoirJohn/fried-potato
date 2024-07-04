import {addPost, deletePost, profile_reducer} from './profile-reducer';

test('add post', () => {
	let action = addPost('It is being tested');
	let state = {
		posts: [
			{text: 'Hello', likeNumber: 12},
			{text: 'How do you do?', likeNumber: 18},
			{text: 'Pretty fine', likeNumber: 4},
		],
	};
	let newState = profile_reducer(state, action);
	expect(newState.posts.length).toEqual(4);
});

test('delete post', () => {
	let action = deletePost(3);
	let state = {
		posts: [
			{text: 'Hello', likeNumber: 12, id: 1},
			{text: 'How do you do?', likeNumber: 18, id: 2},
			{text: 'Pretty fine', likeNumber: 4, id: 3},
		],
	};

	let newState = profile_reducer(state, action);
	expect(newState.posts.length).toEqual(2);
});