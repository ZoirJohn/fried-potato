import { UserType } from '../types'
import { instance } from './api'
import { ResponseType } from './api'

type UsersResponseType = {
      items: Array<UserType>
      totalCount: number
      error: string
}
export const usersAPI = {
      GET_USERS: (currentPage: number, pageSize: number) => {
            return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data)
      },
      GET_FRIENDS: () => {
            return instance.get<UsersResponseType>('users?friend=true').then((response) => response.data)
      },
      FOLLOW: (id: number) => {
            return instance.post<ResponseType>(`follow/${id}`).then((response) => response.data)
      },
      UNFOLLOW: (id: number) => {
            return instance.delete<ResponseType>(`follow/${id}`).then((response) => response.data)
      },
}
