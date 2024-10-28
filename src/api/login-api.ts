import { ResponseType, ResultCodeCaptcha, ResultCodeSuccessError } from './api'
import { instance } from './api'

type LoginDataType = {
      userId: number
      token: string
}
type CaptchaDataType = {
      url: string
}
export const loginAPI = {
      LOGIN: (email: string, password: string, captcha: string) => {
            return instance.post<ResponseType<LoginDataType, ResultCodeSuccessError | ResultCodeCaptcha>>(`auth/login`, { email, password, captcha }, {}).then((res) => res.data)
      },
      LOGOUT: () => {
            return instance.delete<ResponseType>(`auth/login`).then((res) => res.data)
      },
      CAPTCHA: () => {
            return instance.get<CaptchaDataType>(`security/get-captcha-url`).then((res) => res.data)
      },
}
