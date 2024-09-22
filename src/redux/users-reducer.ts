import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../api/api"
import { UserType } from "../types"
import { rootStateType } from "./store"
import { Dispatch } from "redux"

const FOLLOW = "users/ADD-POST-PROFILE"
const UNFOLLOW = "users/UPDATE-POST-PROFILE"
const SET_USERS = "users/SET-USERS"
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE"
const SET_FETCHING = "users/SET-FETCHING"
const SET_IN_PROGRESS = "users/SET-IN-PROGRESS"

let initialState = {
      usersList: [] as Array<UserType>,
      overall: 40 as number | null,
      pageSize: 5 as number | null,
      currentPage: 1 as number | null,
      page: 1 as number | null,
      isFetching: null as boolean | null,
      inProgress: [] as Array<number>, // ? Array of user ids that are being processed by following or unfollowing
}

type actionTypeProp = {
      type: string
}
type actionOtherProp = {
      [key: string]: any
}
export type InitialStateUsersType = typeof initialState

const users_reducer = (_state = initialState, action: actionTypeProp & actionOtherProp): InitialStateUsersType => {
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

// type actionTypeCreator = (params: any) => {
//       type: string;
//       userId?: number;
//       thisPageNumber?: number;
//       isFethcing?: boolean;
//       isInProgress?: boolean;
//       id?: number;
// };

type followDoneType = { type: typeof FOLLOW; userId: number }
const followDone = (userId: number): followDoneType => ({ type: FOLLOW, userId: userId })

type unfollowDoneType = { type: typeof UNFOLLOW; userId: number }
const unfollowDone = (userId: number): unfollowDoneType => ({ type: UNFOLLOW, userId: userId })

type setUsersType = { type: typeof SET_USERS; users: Array<UserType> }
const setUsers = (users: Array<UserType>): setUsersType => ({ type: SET_USERS, users })

type setCurrentPage = { type: typeof SET_CURRENT_PAGE; thisPageNumber: number }
const setCurrentPage = (thisPageNumber: number): setCurrentPage => ({ type: SET_CURRENT_PAGE, thisPageNumber })

type setFetchingType = { type: typeof SET_FETCHING; isFetching: boolean }
const setFetching = (isFetching: boolean): setFetchingType => ({ type: SET_FETCHING, isFetching })

type setInProgressType = { type: typeof SET_IN_PROGRESS; isInProgress: boolean; id: number }
const setInProgress = (isInProgress: boolean, id: number): setInProgressType => ({
      type: SET_IN_PROGRESS,
      isInProgress,
      id,
})

type ActionTypes = followDoneType | unfollowDoneType | setUsersType | setCurrentPage | setFetchingType | setInProgressType

// ! One type of typization
const getUsersThunk = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionTypes>, getState: rootStateType) => {
      dispatch(setFetching(true))
      const data = await usersAPI.GET_USERS(currentPage, pageSize)
      if (data.items) {
            dispatch(setUsers(data.items))
            dispatch(setFetching(false))
      }
}

// ! Second type of typization
const unfollow =
      (userId: number): ThunkAction<Promise<void>, rootStateType, unknown, ActionTypes> =>
      async (dispatch) => {
            dispatch(setInProgress(true, userId))
            const data = await usersAPI.UNFOLLOW(userId)
            if (data.resultCode === 0) {
                  dispatch(unfollowDone(userId))
                  dispatch(setInProgress(false, userId))
            }
      }

const follow =
      (userId: number): ThunkAction<Promise<void>, rootStateType, unknown, ActionTypes> =>
      async (dispatch) => {
            dispatch(setInProgress(true, userId))
            const data = await usersAPI.FOLLOW(userId)
            if (data.resultCode === 0) {
                  dispatch(followDone(userId))
                  dispatch(setInProgress(false, userId))
            }
      }

export { users_reducer, setUsers, setCurrentPage, getUsersThunk, follow, unfollow }
