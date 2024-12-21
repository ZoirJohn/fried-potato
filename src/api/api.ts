import { default as axios } from 'axios'
import { API_KEY } from '../components/login/Login'

// 7eb291b4-dad0-4e4f-9b01-2c556d91e838 mine

export const instance = axios.create({
      baseURL: 'https://social-network.samuraijs.com/api/1.0',
      withCredentials: true,
      headers: { 'API-KEY': API_KEY },
})

export enum ResultCodeSuccessError {
      Success = 0,
      Error = 1,
}
export enum ResultCodeCaptcha {
      Captcha = 10,
}

export type ResponseType<D = {}, RC = ResultCodeSuccessError> = {
      messages: Array<string>
      resultCode: RC
      data: D
}
