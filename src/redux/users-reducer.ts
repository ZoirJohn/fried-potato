import { ThunkAction } from 'redux-thunk'
import { ResultCodeSuccessError, usersAPI } from '../api/api'
import { UserType } from '../types'
import { ActionsTypes, rootStateType } from './store'
import { Dispatch } from 'redux'

const FOLLOW = 'users/ADD-POST-PROFILE'
const UNFOLLOW = 'users/UPDATE-POST-PROFILE'
const SET_USERS = 'users/SET-USERS'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_FETCHING = 'users/SET-FETCHING'
const SET_IN_PROGRESS = 'users/SET-IN-PROGRESS'

let initialState = {
      usersList: [] as Array<UserType>,
      overall: 40 as number | null,
      pageSize: 5 as number | null,
      currentPage: 1 as number | null,
      page: 1 as number | null,
      isFetching: null as boolean | null,
      inProgress: [] as Array<number>, // ? Array of user ids that are being processed by following or unfollowing
}

export type InitialStateUsersType = typeof initialState

const users_reducer = (_state = initialState, action: UsersActionsTypes): InitialStateUsersType => {
      switch (action.type) {
            case FOLLOW: {
                  return {
                        ..._state,
                        usersList: _state.usersList.map((u: any) => {
                              if (u.id === action.userId) {
                                    return { ...u, followed: true }
                              }
                              return u
                        }),
                  }
            }
            case UNFOLLOW: {
                  return {
                        ..._state,
                        usersList: _state.usersList.map((u: any) => {
                              if (u.id === action.userId) {
                                    return { ...u, followed: false }
                              }
                              return u
                        }),
                  }
            }
            case SET_USERS: {
                  return {
                        ..._state,
                        usersList: [...action.users],
                  }
            }
            case SET_CURRENT_PAGE: {
                  return {
                        ..._state,
                        currentPage: action.thisPageNumber,
                  }
            }
            case SET_FETCHING: {
                  return {
                        ..._state,
                        isFetching: action.isFetching,
                  }
            }
            case SET_IN_PROGRESS: {
                  return {
                        ..._state,
                        inProgress: action.isInProgress ? [..._state.inProgress, action.id] : _state.inProgress.filter((i) => i !== action.id),
                  }
            }
            default: {
                  return _state
            }
      }
}

let UsersActions = {
      followDone: (userId: number) => ({ type: FOLLOW, userId: userId } as const),
      unfollowDone: (userId: number) => ({ type: UNFOLLOW, userId: userId } as const),
      setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
      setCurrentPage: (thisPageNumber: number) => ({ type: SET_CURRENT_PAGE, thisPageNumber } as const),
      setFetching: (isFetching: boolean) => ({ type: SET_FETCHING, isFetching } as const),
      setInProgress: (isInProgress: boolean, id: number) =>
            ({
                  type: SET_IN_PROGRESS,
                  isInProgress,
                  id,
            } as const),
}

type UsersActionsTypes = ActionsTypes<typeof UsersActions>

// ? One type of typization
const getUsersThunk = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<UsersActionsTypes>, getState: rootStateType) => {
      dispatch(UsersActions.setFetching(true))
      const data = await usersAPI.GET_USERS(currentPage, pageSize)
      if (data.items) {
            dispatch(UsersActions.setUsers(data.items))
            dispatch(UsersActions.setFetching(false))
      }
}

// ? Second type of typization
const unfollow =
      (userId: number): ThunkAction<Promise<void>, rootStateType, unknown, UsersActionsTypes> =>
      async (dispatch) => {
            dispatch(UsersActions.setInProgress(true, userId))
            const data = await usersAPI.UNFOLLOW(userId)
            if (data.resultCode === ResultCodeSuccessError.Success) {
                  dispatch(UsersActions.unfollowDone(userId))
                  dispatch(UsersActions.setInProgress(false, userId))
            }
      }

const follow =
      (userId: number): ThunkAction<Promise<void>, rootStateType, unknown, UsersActionsTypes> =>
      async (dispatch) => {
            dispatch(UsersActions.setInProgress(true, userId))
            const data = await usersAPI.FOLLOW(userId)
            if (data.resultCode === ResultCodeSuccessError.Success) {
                  dispatch(UsersActions.followDone(userId))
                  dispatch(UsersActions.setInProgress(false, userId))
            }
      }

export { users_reducer, UsersActions, getUsersThunk, follow, unfollow }
