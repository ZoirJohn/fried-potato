import { usersAPI } from "../api/api";

const FOLLOW = "users/ADD-POST-PROFILE";
const UNFOLLOW = "users/UPDATE-POST-PROFILE";
const SET_USERS = "users/SET-USERS";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_FETCHING = "users/SET-FETCHING";
const SET_IN_PROGRESS = "users/SET-IN-PROGRESS";

type PhotosType = {
      small: string | null;
      large: string | null;
};

type UsersType = {
      name: string;
      id: number;
      photos: PhotosType;
      status: string;
      followed: boolean;
};

let initialState = {
      usersList: [] as Array<UsersType>,
      overall: 40 as number | null,
      pageSize: 5 as number | null,
      currentPage: 1 as number | null,
      page: 1 as number | null,
      isFetching: null as boolean | null,
      inProgress: [] as Array<number>, // ? Array of user ids that are being processed by following or unfollowing
};

type actionTypeProp = {
      type: string;
};
type actionOtherProp = {
      [key: string]: any;
};
type InitialStateType = typeof initialState;

const users_reducer = (_state = initialState, action: actionTypeProp & actionOtherProp): InitialStateType => {
      switch (action.type) {
            case FOLLOW: {
                  return {
                        ..._state,
                        usersList: _state.usersList.map((u: any) => {
                              if (u.id === action.userId) {
                                    return { ...u, followed: true };
                              }
                              return u;
                        }),
                  };
            }
            case UNFOLLOW: {
                  return {
                        ..._state,
                        usersList: _state.usersList.map((u: any) => {
                              if (u.id === action.userId) {
                                    return { ...u, followed: false };
                              }
                              return u;
                        }),
                  };
            }
            case SET_USERS: {
                  return {
                        ..._state,
                        usersList: [...action.users],
                  };
            }
            case SET_CURRENT_PAGE: {
                  return {
                        ..._state,
                        currentPage: action.thisPageNumber,
                  };
            }
            case SET_FETCHING: {
                  return {
                        ..._state,
                        isFetching: action.isFetching,
                  };
            }
            case SET_IN_PROGRESS: {
                  return {
                        ..._state,
                        inProgress: action.isInProgress
                              ? [..._state.inProgress, action.id]
                              : _state.inProgress.filter((i) => i !== action.id),
                  };
            }
            default: {
                  return _state;
            }
      }
};

type actionTypeCreator = (params: any) => {
      type: string;
      userId?: number;
      thisPageNumber?: number;
      isFethcing?: boolean;
      isInProgress?: boolean;
      id?: number;
};
// type actionObject = {
//       type: string;
//       userId: number;
// };
const followDone: actionTypeCreator = (userId: number) => ({ type: FOLLOW, userId: userId });
const unfollowDone: actionTypeCreator = (userId: number) => ({ type: UNFOLLOW, userId: userId });
const setUsers: actionTypeCreator = (users: Array<object>) => ({ type: SET_USERS, users });
const setCurrentPage: actionTypeCreator = (thisPageNumber: number) => ({ type: SET_CURRENT_PAGE, thisPageNumber });
const setFetching: actionTypeCreator = (isFetching: boolean) => ({ type: SET_FETCHING, isFetching });
const setInProgress = (isInProgress: boolean, id: number) => ({ isInProgress, id });

const getUsersThunk = (currentPage: number, pageSize: number) => (dispatch: Function) => {
      dispatch(setFetching(true));
      usersAPI.GET_USERS(currentPage, pageSize).then((data) => {
            dispatch(setUsers(data.items));
            dispatch(setFetching(false));
      });
};
const unfollow = (userId: number) => (dispatch: Function) => {
      dispatch(setInProgress(true, userId));
      usersAPI.UNFOLLOW(userId).then((data) => {
            if (data.resultCode === 0) {
                  dispatch(unfollowDone(userId));
                  dispatch(setInProgress(false, userId));
            }
      });
};
const follow = (userId: number) => (dispatch: Function) => {
      dispatch(setInProgress(true, userId));
      usersAPI.FOLLOW(userId).then((data) => {
            if (data.resultCode === 0) {
                  dispatch(followDone(userId));
                  dispatch(setInProgress(false, userId));
            }
      });
};
export { users_reducer, setUsers, setCurrentPage, getUsersThunk, follow, unfollow };
