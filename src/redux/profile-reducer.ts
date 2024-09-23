import { reset } from "redux-form"
import { profileAPI } from "../api/api"
import createThunk from "../assets/createThunk"
import { MessageType, PhotosType, ProfileType } from "../types"

const ADD_POST_PROFILE = "profile/ADD-POST-PROFILE"
const DELETE_POST_PROFILE = "profile/DELETE-POST-PROFILE"
const SET_PROFILE = "profile/SET-PROFILE"
const SET_STATUS = "profile/SET-STATUS"
const SET_PROFILE_PHOTO = "profile/SET-PROFILE-PHOTO"
const SAVE_PROFILE = "profile/SAVE-PROFILE"

let initialState = {
      posts: [
            { text: "Hello", likeNumber: 12, id: 1 },
            { text: "How do you do?", likeNumber: 18, id: 2 },
            { text: "Pretty fine", likeNumber: 4, id: 3 },
      ] as Array<MessageType>,
      profileUser: null as ProfileType | null,
      status: null as string | null,
}

export type InitialStateProfileType = typeof initialState

const profile_reducer = (_state = initialState, action: ProfileActionsTypes): any => {
      switch (action.type) {
            case ADD_POST_PROFILE:
                  let newPost = { text: action.text, likeNumber: Math.floor(Math.random() * 10), id: 4 }
                  return { ..._state, posts: [..._state.posts, newPost] }
            case DELETE_POST_PROFILE:
                  return { ..._state, posts: _state.posts.filter((post) => post.id !== action.id) }
            case SET_PROFILE:
                  return { ..._state, profileUser: action.profileUser }
            case SET_STATUS:
                  return { ..._state, status: action.status }
            case SET_PROFILE_PHOTO:
                  return { ..._state, profileUser: { ..._state.profileUser, photos: action.photo } }
            // case SAVE_PROFILE:
            //       return { ..._state, profileUser: { ..._state.profileUser, ...action.data } }
            default:
                  return _state
      }
}

// ? Action creators
type addPostType = { type: typeof ADD_POST_PROFILE; text: string }
const addPost = (text: string): addPostType => ({ type: ADD_POST_PROFILE, text })

type deletePostType = { type: typeof DELETE_POST_PROFILE; id: number }
const deletePost = (id: number): deletePostType => ({ type: DELETE_POST_PROFILE, id })

type setProfileDoneType = { type: typeof SET_PROFILE; profileUser: ProfileType }
const setProfileDone = (profileUser: ProfileType): setProfileDoneType => ({ type: SET_PROFILE, profileUser })

type setStatusDoneType = { type: typeof SET_STATUS; status: string }
const setStatusDone = (status: string): setStatusDoneType => ({ type: SET_STATUS, status })

type setProfilePhotoDoneType = { type: typeof SET_PROFILE_PHOTO; photo: PhotosType }
const setProfilePhotoDone = (photo: PhotosType): setProfilePhotoDoneType => ({ type: SET_PROFILE_PHOTO, photo })

export type ProfileRequests = typeof profileAPI.GET_PROFILE_USER | typeof profileAPI.GET_PROFILE_STATUS | typeof profileAPI.UPDATE_PROFILE_PHOTO | typeof profileAPI.UPDATE_PROFILE_STATUS
export type ProfileActionsTypes = addPostType | deletePostType | setProfileDoneType | setStatusDoneType | setProfilePhotoDoneType

// ? Thunks
const setProfile = (userId: number) => createThunk(profileAPI.GET_PROFILE_USER, setProfileDone, userId)
const setStatus = (userId: number) => createThunk(profileAPI.GET_PROFILE_STATUS, setStatusDone, userId)
const savePhoto = (photo: PhotosType) => createThunk(profileAPI.UPDATE_PROFILE_PHOTO, setProfilePhotoDone, photo)
const updateStatus = (status: string) => createThunk(profileAPI.UPDATE_PROFILE_STATUS, setStatusDone, status)

const saveProfile = (data: ProfileType) => async (dispatch: Function) => {
      const response = await profileAPI.UPDATE_PROFILE(data)
      if (response.resultCode === 0) {
            dispatch(reset("settings_data"))
      }
}

export { profile_reducer, addPost, deletePost, setProfile, setStatus, updateStatus, savePhoto, saveProfile }
