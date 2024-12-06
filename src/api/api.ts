import { default as axios } from 'axios'

const KEYS = ['7eb291b4-dad0-4e4f-9b01-2c556d91e838', '471a4f85-ebaf-497e-8659-6013051cea8a']
export const instance = axios.create({
      baseURL: 'https://social-network.samuraijs.com/api/1.0',
      withCredentials: true,
      headers: { 'API-KEY': KEYS[0] },
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
