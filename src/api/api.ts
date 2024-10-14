import { default as axios } from "axios"
import { ProfileType } from "../types"

const instance = axios.create({
      baseURL: "https://social-network.samuraijs.com/api/1.0",
      withCredentials: true,
      headers: { "API-KEY": "7eb291b4-dad0-4e4f-9b01-2c556d91e838" },
})

export const usersAPI = {
      GET_USERS: (currentPage: number, pageSize: number) => {
            return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data)
      },
      FOLLOW: (id: number) => {
            return instance.post(`follow/${id}`).then((response) => response.data)
      },
      UNFOLLOW: (id: number) => {
            return instance.delete(`follow/${id}`).then((response) => response.data)
      },
}

type MeResponseType = {
      resultCode: number
      messages: Array<string>
      data: {
            id: number
            email: string
            login: string
      }
}

export const authAPI = {
      IS_REGISTERED: () => {
            return instance.get("auth/me").then((response) => response.data)
      },
}

export const profileAPI = {
      GET_PROFILE_USER: (userId: number) => {
            return instance.get(`profile/${userId}`).then((response) => response)
      },
      GET_PROFILE_STATUS: (userId: number) => {
            return instance.get(`profile/status/${userId}`).then((response) => response)
      },
      UPDATE_PROFILE_STATUS: (status: string) => {
            return instance.put(`profile/status`, { status }).then((response) => response.data)
      },
      UPDATE_PROFILE_PHOTO: (photo: any) => {
            let formData = new FormData()
            formData.append("image", photo)
            return instance.put(`profile/photo`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => response.data)
      },
      UPDATE_PROFILE: (data: ProfileType) => {
            return instance.put("profile", data).then((response) => response.data)
      },
}

export const loginAPI = {
      LOGIN: (email: string, password: string, captcha: string) => {
            return instance.post(`auth/login`, { email, password, captcha }, {}).then((response) => response.data)
      },
      LOGOUT: (email: string, password: string) => {
            return instance.delete(`auth/login`).then((response) => response.data)
      },
      CAPTCHA: () => {
            return instance.get(`security/get-captcha-url`).then((response) => response.data)
      },
}
