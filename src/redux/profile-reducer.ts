import { reset } from 'redux-form'
import { ResultCodeSuccessError, profileAPI } from '../api/api'
import createThunk from '../assets/createThunk'
import { MessageType, PhotosType, ProfileType } from '../types'
import { ActionsTypes } from './store'

const ADD_POST_PROFILE = 'profile/ADD-POST-PROFILE'
const DELETE_POST_PROFILE = 'profile/DELETE-POST-PROFILE'
const SET_PROFILE = 'profile/SET-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'
const SET_PROFILE_PHOTO = 'profile/SET-PROFILE-PHOTO'

let initialState = {
      posts: [
            { text: 'Hello', likeNumber: 12, id: 1 },
            { text: 'How do you do?', likeNumber: 18, id: 2 },
            { text: 'Pretty fine', likeNumber: 4, id: 3 },
      ] as Array<MessageType>,
      profileUser: null as ProfileType | null,
      status: null as string | null,
}

export type InitialStateProfileType = typeof initialState

const profile_reducer = (_state = initialState, action: ProfileActionsTypes): InitialStateProfileType => {
      switch (action.type) {
            case ADD_POST_PROFILE:
                  let newPost = { text: action.text, likeNumber: Math.floor(Math.random() * 10), id: 4 }
                  return { ..._state, posts: [..._state.posts, newPost] }
            case DELETE_POST_PROFILE:
                  return { ..._state, posts: _state.posts.filter((post) => post.id !== action.id) }
            case SET_PROFILE:
                  return { ..._state, profileUser: action.profileUser }
            case SET_STATUS:
                  return { ..._state, status: action.status}
            case SET_PROFILE_PHOTO:
                  return { ..._state, profileUser: { ..._state.profileUser, photos: action.photo } as ProfileType }
            default:
                  return _state
      }
}

// ? Action creators

let ProfileActions = {
      addPost: (text: string) => ({ type: ADD_POST_PROFILE, text } as const),
      deletePost: (id: number) => ({ type: DELETE_POST_PROFILE, id } as const),
      setProfileDone: (profileUser: ProfileType) => ({ type: SET_PROFILE, profileUser } as const),
      setStatusDone: (status: string) => ({ type: SET_STATUS, status } as const),
      setProfilePhotoDone: (photo: PhotosType) => ({ type: SET_PROFILE_PHOTO, photo } as const),
}
type ProfileActionsTypes = ActionsTypes<typeof ProfileActions>

// ? Thunks
const setProfile = (userId: number) => createThunk(profileAPI.GET_PROFILE_USER, ProfileActions.setProfileDone, userId)
const setStatus = (userId: number) => createThunk(profileAPI.GET_PROFILE_STATUS, ProfileActions.setStatusDone, userId)
const savePhoto = (photo: PhotosType) => createThunk(profileAPI.UPDATE_PROFILE_PHOTO, ProfileActions.setProfilePhotoDone, photo)
const updateStatus = (status: string) => createThunk(profileAPI.UPDATE_PROFILE_STATUS, ProfileActions.setStatusDone, status)

const saveProfile = (data: ProfileType) => async (dispatch: Function) => {
      const response = await profileAPI.UPDATE_PROFILE(data)
      if (response.resultCode === ResultCodeSuccessError.Success) {
            dispatch(reset('settings_data'))
      }
}

export { profile_reducer, ProfileActions, setProfile, setStatus, savePhoto, updateStatus, saveProfile }
