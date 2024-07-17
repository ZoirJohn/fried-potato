import { createSelector } from 'reselect';

export const getUsersList = (state) => {
	return state.users.usersList;
};
export const getOverall = (state) => {
	return state.users.overall;
};
export const getPageSize = (state) => {
	return state.users.pageSize;
};
export const getCurrentPage = (state) => {
	return state.users.currentPage;
};
export const getIsFetching = (state) => {
	return state.users.isFetching;
};
export const getInProgress = (state) => {
	return state.users.inProgress;
};


export const getUsersListSelector = createSelector(getUsersList, (users) => {
	return users.filter(user => user);
}); // Complicated selector that uses primitive selector as a parameter