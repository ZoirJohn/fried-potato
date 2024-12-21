import { stopSubmit } from 'redux-form'
import { ResultCodeSuccessError } from '../api/api'
import { ThunkAction } from 'redux-thunk'
import { ActionsTypes, rootStateType } from './store'
import { authAPI } from '../api/auth-api'
import { loginAPI } from '../api/login-api'

let initialState = {
      id: null as number | null,
      login: null as string | null,
      email: null as string | null,
      password: null as string | null,
      isAuthorized: false as boolean | null,
      captcha: null as string | null,
}
let globalId: number | null

export type InitialStateAuthType = typeof initialState

const auth_reducer = (_state = initialState, action: AuthActionsTypes): InitialStateAuthType => {
      switch (action.type) {
            case 'social-app/auth/SET-USER-DATA':
                  return {
                        ..._state,
                        id: action.id,
                        login: action.login,
                        email: action.email,
                        isAuthorized: action.isAuthorized,
                  }
            case 'social-app/auth/DELETE-USER-DATA':
                  return {
                        ..._state,
                        id: null,
                        login: null,
                        email: null,
                        isAuthorized: false,
                  }
            case 'social-app/auth/SET-CAPTCHA':
                  return {
                        ..._state,
                        captcha: action.url,
                  }
            default:
                  return { ..._state }
      }
}
type AuthActionsTypes = ActionsTypes<typeof AuthActions>

let AuthActions = {
      setUserDataDone: (id: number | null, login: string | null, email: string | null, isAuthorized: boolean) =>
            ({
                  type: 'social-app/auth/SET-USER-DATA',
                  id,
                  login,
                  email,
                  isAuthorized,
            } as const),

      setCaptchaDone: (url: string) => ({ type: 'social-app/auth/SET-CAPTCHA', url } as const),
      deleteUserDataDone: () => ({ type: 'social-app/auth/DELETE-USER-DATA' } as const),
}

const setCaptcha = (): ThunkAction<Promise<void>, rootStateType, unknown, AuthActionsTypes> => async (dispatch) => {
      const data = await loginAPI.CAPTCHA()
      if (data.url) {
            dispatch(AuthActions.setCaptchaDone(data.url))
      }
}
const setUserData = (): ThunkAction<Promise<void>, rootStateType, unknown, AuthActionsTypes> => async (dispatch) => {
      const data = await authAPI.IS_REGISTERED()
      localStorage.setItem('id', data.data.login)
      if (data.resultCode === ResultCodeSuccessError.Success) {
            const { id, login, email } = data.data
            dispatch(AuthActions.setUserDataDone(id, login, email, true))
      }
}
const sendAuthData =
      (email: string, password: string, captcha: string, apiKey: string): ThunkAction<Promise<void>, rootStateType, unknown, AuthActionsTypes> =>
      async (dispatch: Function) => {
            console.log(email, password, captcha, apiKey)
            const data = await loginAPI.LOGIN(email, password, captcha)
            if (data.resultCode === ResultCodeSuccessError.Success) {
                  dispatch(setUserData())
            } else {
                  const message = data.messages[0]
                  if (data.resultCode === 10) {
                        dispatch(setCaptcha())
                  }
                  dispatch(stopSubmit('login', { _error: message }))
            }
      }
const deleteAuthData = (): ThunkAction<Promise<void>, rootStateType, unknown, AuthActionsTypes> => async (dispatch) => {
      const data = await loginAPI.LOGOUT()
      if (data.resultCode === ResultCodeSuccessError.Success) {
            dispatch(AuthActions.deleteUserDataDone())
      }
}

export { auth_reducer, setUserData, sendAuthData, deleteAuthData, globalId }
