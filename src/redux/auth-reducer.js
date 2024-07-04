import {authAPI, loginAPI} from '../api/api';

const SET_USER_DATA = 'auth/SET-USER-DATA';
const DELETE_USER_DATA = 'auth/DELETE-USER-DATA';

let initialState = {
	id: null,
	login: null,
	email: null,
	password: null,
	isAuthorized: false,
};
const auth_reducer = (_state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				..._state,
				id: action.id,
				login: action.login,
				email: action.email,
				isAuthorized: action.isAuthorized,
			};
		case DELETE_USER_DATA:
			return {
				..._state,
				id: null,
				login: null,
				email: null,
				isAuthorized: false,
			};
		default:
			return {..._state};
	}
};
const setUserDataDone = (id, login, email, isAuthorized) => ({type: SET_USER_DATA, id, login, email, isAuthorized});
const setUserData = () => (dispatch) => {
	return authAPI.IS_REGISTERED().then((data) => {
		if (data.resultCode === 0) {
			const {id, login, email} = data.data;
			dispatch(setUserDataDone(id, login, email, true));
		}
	});
};
const sendAuthData = (email, password) => (dispatch) => {
	loginAPI.LOGIN(email, password).then(data => {
		if (data.resultCode === 0) {
			dispatch(setUserData());
		}
	});
};
const deleteAuthData = (email, password) => (dispatch) => {
	loginAPI.LOGOUT(email, password).then(data => {
		if (data.resultCode === 0) {
			dispatch(setUserDataDone(null, null, null, false));
		}
	});
};
export {auth_reducer, setUserData, sendAuthData, deleteAuthData};