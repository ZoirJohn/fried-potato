import { UserType } from '../types'
import { instance } from './api'
import { ResponseType } from './api'

type UsersResponseType = {
      items: Array<UserType>
      totalCount: number
      error: string
}
export const usersAPI = {
      GET_USERS: (currentPage: number, pageSize: number,  term: string = '') => {
            return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`).then((res) => res.data)
      },
      GET_FRIENDS: () => {
            return instance.get<UsersResponseType>('users?friend=true').then((res) => res.data)
      },
      SEARCH_USERS: (term: string) => {
            return instance.get<UsersResponseType>(`users?term=${term}`).then((res) => res.data)
      },
      FOLLOW: (id: number) => {
            return instance.post<ResponseType>(`follow/${id}`).then((res) => res.data)
      },
      UNFOLLOW: (id: number) => {
            return instance.delete<ResponseType>(`follow/${id}`).then((res) => res.data)
      },
}
