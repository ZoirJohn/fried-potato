import { ThunkAction } from 'redux-thunk'
import { setUserData } from './auth-reducer'
import { ActionsTypes, rootStateType } from './store'

let initialState = {
      initialized: false as boolean | null,
}

export type InitialStateAppType = typeof initialState

const app_reducer = (_state = initialState, action: AppActionsTypes): InitialStateAppType => {
      switch (action.type) {
            case 'social-app/app/INIT-SUCCESS':
                  return {
                        ..._state,
                        initialized: true,
                  }
            default:
                  return { ..._state }
      }
}
let AppActions = {
      setInitialized: () => ({ type: 'social-app/app/INIT-SUCCESS' }),
}
type AppActionsTypes = ActionsTypes<typeof AppActions>

const initializeApp = (): ThunkAction<Promise<void>, rootStateType, unknown, AppActionsTypes> => async (dispatch) => {
      const promise = dispatch(setUserData())
      Promise.all([promise]).then(() => {
            dispatch(AppActions.setInitialized())
      })
}

export { app_reducer, initializeApp }
