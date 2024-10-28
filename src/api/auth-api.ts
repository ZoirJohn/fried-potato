import { instance } from './api'
import { ResponseType } from './api'

type AuthDataType = {
      id: number
      email: string
      login: string
}
export const authAPI = {
      IS_REGISTERED: () => {
            return instance.get<ResponseType<AuthDataType>>('auth/me').then((res) => res.data)
      },
}
