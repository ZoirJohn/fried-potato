import { reset } from 'redux-form'
import { ResultCodeSuccessError, profileAPI } from '../api/api'
import createThunk from '../assets/createThunk'
import { MessageType, PhotosType, ProfileType } from '../types'
import { ActionsTypes } from './store'

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

const profile_reducer = (_state = initialState, action: ProfileActionsTypes): any => {
      switch (action.type) {
            case 'social-app/profile/ADD-POST-PROFILE':
                  let newPost = { text: action.text, likeNumber: Math.floor(Math.random() * 10), id: 4 }
                  return { ..._state, posts: [..._state.posts, newPost] }
            case 'social-app/profile/DELETE-POST-PROFILE':
                  return { ..._state, posts: _state.posts.filter((post) => post.id !== action.id) }
            case 'social-app/profile/SET-PROFILE':
                  return { ..._state, profileUser: action.profileUser }
            case 'social-app/profile/SET-STATUS':
                  return { ..._state, status: action.status }
            case 'social-app/profile/SET-PROFILE-PHOTO':
                  return { ..._state, profileUser: { ..._state.profileUser, photos: action.photo } as ProfileType }
            default:
                  return _state
      }
}

// ? Action creators

let ProfileActions = {
      addPost: (text: string) => ({ type: 'social-app/profile/ADD-POST-PROFILE', text } as const),
      deletePost: (id: number) => ({ type: 'social-app/profile/DELETE-POST-PROFILE', id } as const),
      setProfileDone: (profileUser: ProfileType) => ({ type: 'social-app/profile/SET-PROFILE', profileUser } as const),
      setStatusDone: (status: string) => ({ type: 'social-app/profile/SET-STATUS', status } as const),
      setProfilePhotoDone: (photo: PhotosType) => ({ type: 'social-app/profile/SET-PROFILE-PHOTO', photo } as const),
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
