import { createSelector } from 'reselect'
import { rootStateType } from './redux/store'

// ! USERS
export const getUsersList = (state: rootStateType) => {
      return state.users.usersList
}
export const getOverall = (state: rootStateType) => {
      return state.users.overall
}
export const getPageSize = (state: rootStateType) => {
      return state.users.pageSize
}
export const getCurrentPage = (state: rootStateType) => {
      return state.users.currentPage
}
export const getIsFetching = (state: rootStateType) => {
      return state.users.isFetching
}
export const getInProgress = (state: rootStateType) => {
      return state.users.inProgress
}
export const getFilter = (state: rootStateType) => {
      return state.users.filter
}
export const getUsersListSelector = createSelector(getUsersList, (users) => {
      return users.filter((user) => user)
}) // * Complicated selector that uses primitive selector as a parameter

// ! AUTH
export const getAuth = (state: rootStateType) => {
      return state.auth.isAuthorized
}
export const getCaptcha = (state: rootStateType) => {
      return state.auth.captcha
}
export const getId = (state: rootStateType) => {
      return state.auth.id
}
// ! DIALOGS
export const getContacts = (state: rootStateType) => {
      return state.dialogs.contacts
}
export const getTexts = (state: rootStateType) => {
      return state.dialogs.texts
}

// ! PROFILE
export const getProfileUser = (state: rootStateType) => {
      return state.profile.profileUser
}
export const getStatus = (state: rootStateType) => {
      return state.profile.status
}
export const getPosts = (state: rootStateType) => {
      return state.profile.posts
}
