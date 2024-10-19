import { AxiosResponse, default as axios } from "axios"
import { ProfileType } from "../types"

const instance = axios.create({
      baseURL: "https://social-network.samuraijs.com/api/1.0",
      withCredentials: true,
      headers: { "API-KEY": "7eb291b4-dad0-4e4f-9b01-2c556d91e838" },
})

// ? ENUMS
export enum ResultCodeSuccessError {
      Success = 0,
      Error = 1,
}
export enum ResultCodeCaptcha {
      Captcha = 10,
}

// ? Users Page API
type UsersResponseType = {
      items: Array<{
            name: string
            id: number
            photos: {
                  small: null | string
                  large: null | string
            }
            status: null | string
            followed: boolean
      }>
      totalCount: number
      error: string
}
export const usersAPI = {
      GET_USERS: (currentPage: number, pageSize: number) => {
            return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data)
      },
      FOLLOW: (id: number) => {
            return instance.post<ResponseType>(`follow/${id}`).then((response) => response.data)
      },
      UNFOLLOW: (id: number) => {
            return instance.delete<ResponseType>(`follow/${id}`).then((response) => response.data)
      },
}

// ? Authentication API
type MeResponseType = {
      resultCode: ResultCodeSuccessError
      messages: Array<string>
      data: {
            id: number
            email: string
            login: string
      }
}
export const authAPI = {
      IS_REGISTERED: () => {
            return instance.get<MeResponseType>("auth/me").then((response) => response.data)
      },
}

// ? Profile Page API
type ProfileResponseType = {
      messages: Array<string>
      data: {
            small?: string
            large?: string
      }
      resultCode: ResultCodeSuccessError
}
type ResponseType = {
      messages: Array<string>
      resultCode: ResultCodeSuccessError
      data: ProfileType
}
export const profileAPI = {
      GET_PROFILE_USER: (userId: number) => {
            return instance.get<ProfileType>(`profile/${userId}`).then((response) => response)
      },
      GET_PROFILE_STATUS: (userId: number) => {
            return instance.get<string>(`profile/status/${userId}`).then((response) => response)
      },
      UPDATE_PROFILE_STATUS: (status: string) => {
            return instance.put<ProfileResponseType>(`profile/status`, { status }).then((response) => response.data)
      },
      UPDATE_PROFILE_PHOTO: (photo: any) => {
            let formData = new FormData()
            formData.append("image", photo)
            return instance.put<ProfileResponseType>(`profile/photo`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => response.data)
      },
      UPDATE_PROFILE: (data: ProfileType) => {
            return instance.put<ResponseType>("profile", data).then((response) => response.data)
      },
}

// ? Login Page API
type LoginResponseType = {
      resultCode: ResultCodeSuccessError | ResultCodeCaptcha
      messages: Array<string>
      data: {
            userId: number
            token: string
      }
}
type CaptchaType = {
      url: string
}
export const loginAPI = {
      LOGIN: (email: string, password: string, captcha: string) => {
            return instance.post<LoginResponseType>(`auth/login`, { email, password, captcha }, {}).then((response) => response.data)
      },
      LOGOUT: () => {
            return instance.delete<LoginResponseType>(`auth/login`).then((response) => response.data)
      },
      CAPTCHA: () => {
            return instance.get<CaptchaType>(`security/get-captcha-url`).then((response) => response.data)
      },
}
