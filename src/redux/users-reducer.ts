import { ThunkAction } from 'redux-thunk'
import { ResultCodeSuccessError } from '../api/api'
import { usersAPI } from '../api/users-api'
import { UserType } from '../types'
import { ActionsTypes, rootStateType } from './store'
import { Dispatch } from 'redux'

let initialState = {
      usersList: [] as Array<UserType>,
      overall: 40 as number | null,
      pageSize: 5 as number | null,
      currentPage: 1 as number | null,
      page: 1 as number | null,
      isFetching: null as boolean | null,
      inProgress: [] as Array<number>, // ? Array of user ids that are being processed by following or unfollowing
      filter: {},
}

export type InitialStateUsersType = typeof initialState

const users_reducer = (_state = initialState, action: UsersActionsTypes): InitialStateUsersType => {
      switch (action.type) {
            case 'social-app/users/FOLLOW': {
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
            case 'social-app/users/UNFOLLOW': {
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
            case 'social-app/users/SET-USERS': {
                  return {
                        ..._state,
                        usersList: [...action.users],
                  }
            }

            case 'social-app/users/SET-CURRENT-PAGE': {
                  return {
                        ..._state,
                        currentPage: action.thisPageNumber,
                  }
            }
            case 'social-app/users/SET-FETCHING': {
                  return {
                        ..._state,
                        isFetching: action.isFetching,
                  }
            }
            case 'social-app/users/SET-IN-PROGRESS-USERS': {
                  return {
                        ..._state,
                        inProgress: action.isInProgress ? [..._state.inProgress, action.id] : _state.inProgress.filter((i) => i !== action.id),
                  }
            }
            case 'social-app/users/SET-FILTER': {
                  return {
                        ..._state,
                        filter: { ...action.payload },
                  }
            }
            case 'social-app/users/SET-OVERALL': {
                  return {
                        ..._state,
                        overall: action.payload,
                  }
            }
            default: {
                  return _state
            }
      }
}

let UsersActions = {
      followDone: (userId: number) => ({ type: 'social-app/users/FOLLOW', userId: userId } as const),
      unfollowDone: (userId: number) => ({ type: 'social-app/users/UNFOLLOW', userId: userId } as const),
      setUsers: (users: Array<UserType>) => ({ type: 'social-app/users/SET-USERS', users } as const),
      setCurrentPage: (thisPageNumber: number) => ({ type: 'social-app/users/SET-CURRENT-PAGE', thisPageNumber } as const),
      setFetching: (isFetching: boolean) => ({ type: 'social-app/users/SET-FETCHING', isFetching } as const),
      setInProgress: (isInProgress: boolean, id: number) =>
            ({
                  type: 'social-app/users/SET-IN-PROGRESS-USERS',
                  isInProgress,
                  id,
            } as const),
      setFilter: (term: string) => ({ type: 'social-app/users/SET-FILTER', payload: { term } } as const),
      setOverall: (overall: number) => ({ type: 'social-app/users/SET-OVERALL', payload: overall } as const),
}

type UsersActionsTypes = ActionsTypes<typeof UsersActions>

// ? One type of typization
const getUsersThunk =
      (currentPage: number, pageSize: number, term: string, searched: boolean = false) =>
      async (dispatch: Dispatch<UsersActionsTypes>, getState: rootStateType) => {
            dispatch(UsersActions.setFetching(true))
            dispatch(UsersActions.setCurrentPage(currentPage))
            dispatch(UsersActions.setFilter(term))
            const data = await usersAPI.GET_USERS(currentPage, pageSize, term)
            if (data.items) {
                  if (searched) {
                        dispatch(UsersActions.setOverall(data.totalCount))
                  }
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
