import {usersAPI} from '../api/api';

const FOLLOW = 'users/ADD-POST-PROFILE';
const UNFOLLOW = 'users/UPDATE-POST-PROFILE';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_FETCHING = 'users/SET-FETCHING';
const SET_IN_PROGRESS = 'users/SET-IN-PROGRESS';

let initialState = {
	usersList: [], overall: 40, pageSize: 5, currentPage: 1, page: 1, isFetching: true, inProgress: [],
};
const users_reducer = (_state = initialState, action) => {
	switch (action.type) {
		case FOLLOW: {
			return {
				..._state, usersList: _state.usersList.map(u => {
					if (u.id === action.userId) {
						return {...u, followed: true};
					}
					return u;
				}),
			};
		}
		case UNFOLLOW: {
			return {
				..._state, usersList: _state.usersList.map(u => {
					if (u.id === action.userId) {
						return {...u, followed: false};
					}
					return u;
				}),
			};
		}
		case SET_USERS: {
			return {
				..._state, usersList: [...action.users],
			};
		}
		case SET_CURRENT_PAGE: {
			return {
				..._state, currentPage: action.thisPageNumber,
			};
		}
		case SET_FETCHING: {
			return {
				..._state, isFetching: action.isFetching,
			};
		}
		case SET_IN_PROGRESS: {
			return {
				..._state,
				inProgress: action.isInProgress ? [..._state.inProgress, action.id] : _state.inProgress.filter(i => i !== action.id),
			};
		}
		default: {
			return _state;
		}
	}
};

const followDone = (userId) => ({
	type: FOLLOW, userId: userId,
});
const unfollowDone = (userId) => ({
	type: UNFOLLOW, userId: userId,
});
const setUsers = (users) => ({
	type: SET_USERS, users,
});
const setCurrentPage = (thisPageNumber) => ({
	type: SET_CURRENT_PAGE, thisPageNumber,
});
const setFetching = (isFetching) => ({
	type: SET_FETCHING, isFetching,
});
const setInProgress = (isInProgress, id) => ({
	type: SET_IN_PROGRESS, isInProgress, id,
});

const getUsersThunk = (currentPage, pageSize) => (dispatch) => {
	dispatch(setFetching(true));
	usersAPI.GET_USERS(currentPage, pageSize).then(data => {
		dispatch(setUsers(data.items));
		dispatch(setFetching(false));
	});
};
const unfollow = (userId) => (dispatch) => {
	dispatch(setInProgress(true, userId));
	usersAPI.UNFOLLOW(userId).then(data => {
		if (data.resultCode === 0) {
			dispatch(unfollowDone(userId));
			dispatch(setInProgress(false, userId));
		}
	});
};
const follow = (userId) => (dispatch) => {
	dispatch(setInProgress(true, userId));
	usersAPI.FOLLOW(userId).then(data => {
		if (data.resultCode === 0) {
			dispatch(followDone(userId));
			dispatch(setInProgress(false, userId));
		}
	});
};
export {
	users_reducer, setUsers, setCurrentPage, getUsersThunk, follow, unfollow,
};