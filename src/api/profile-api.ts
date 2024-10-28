import { PhotosType, ProfileType, UserType } from '../types'
import { instance, ResponseType } from './api'

type ProfileDataType = ProfileType
type PhotosDataType = PhotosType

export const profileAPI = {
      GET_PROFILE_USER: (userId: number) => {
            return instance.get<ResponseType<ProfileDataType>>(`profile/${userId}`).then((res) => res)
      },
      GET_PROFILE_STATUS: (userId: number) => {
            return instance.get<string>(`profile/status/${userId}`).then((res) => res)
      },
      UPDATE_PROFILE_STATUS: (status: string) => {
            return instance.put<ResponseType>(`profile/status`, { status }).then((res) => res.data)
      },
      UPDATE_PROFILE_PHOTO: (photo: any) => {
            let formData = new FormData()
            formData.append('image', photo)
            return instance.put<ResponseType<PhotosDataType>>(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data)
      },
      UPDATE_PROFILE: (data: ProfileType) => {
            return instance.put<ResponseType>('profile', data).then((response) => response.data)
      },
}
