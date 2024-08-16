import { reset } from 'redux-form';
import { profileAPI } from '../api/api';
import reducerCreator from '../assets/reducerCreator';

const ADD_POST_PROFILE = 'profile/ADD-POST-PROFILE';
const DELETE_POST_PROFILE = 'profile/DELETE-POST-PROFILE';
const SET_PROFILE = 'profile/SET-PROFILE';
const SET_STATUS = 'profile/SET-STATUS';
const SET_PROFILE_PHOTO = 'profile/SET-PROFILE-PHOTO';
const SAVE_PROFILE = 'profile/SAVE-PROFILE';

let initialState = {
	posts: [
		{ text: 'Hello', likeNumber: 12, id: 1 },
		{ text: 'How do you do?', likeNumber: 18, id: 2 },
		{ text: 'Pretty fine', likeNumber: 4, id: 3 },
	],
	profileUser: null,
	status: '',
};
const profile_reducer = (_state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_PROFILE:
			let newPost = { text: action.text, likeNumber: Math.floor(Math.random() * 10) };
			return { ..._state, posts: [..._state.posts, newPost] };
		case DELETE_POST_PROFILE:
			return { ..._state, posts: _state.posts.filter(post => post.id !== action.id) };
		case SET_PROFILE:
			return { ..._state, profileUser: action.profileUser };
		case SET_STATUS:
			return { ..._state, status: action.status };
		case SET_PROFILE_PHOTO:
			return { ..._state, profileUser: { ..._state.profileUser, photos: action.photo } };
		case SAVE_PROFILE:
			return { ..._state, profileUser: { ..._state.profileUser, ...action.data } };
		default:
			return _state;
	}
};
const addPost = (text) => ({ type: ADD_POST_PROFILE, text });
const deletePost = (id) => ({ type: DELETE_POST_PROFILE, id });
const setProfileDone = (profileUser) => ({ type: SET_PROFILE, profileUser });
const setStatusDone = (status) => ({ type: SET_STATUS, status });
const setProfilePhotoDone = (photo) => ({ type: SET_PROFILE_PHOTO, photo });

const setProfile = (userId) => reducerCreator(profileAPI.GET_PROFILE_USER, setProfileDone, userId);
const setStatus = (userId) => reducerCreator(profileAPI.UPDATE_PROFILE_STATUS, setStatus, userId);
const updateStatus = (status, id) => reducerCreator(profileAPI.GET_PROFILE_STATUS, setStatusDone, status, id);
const savePhoto = (photo) => reducerCreator(profileAPI.UPDATE_PROFILE_PHOTO, setProfilePhotoDone, photo);
const saveProfile = (data) => async (dispatch) => {
	const response = await profileAPI.UPDATE_PROFILE(data);
	if (response.resultCode === 0) {
		dispatch(reset('settings_data'));
	}
};

export { profile_reducer, addPost, deletePost, setProfile, setStatus, updateStatus, savePhoto, saveProfile };