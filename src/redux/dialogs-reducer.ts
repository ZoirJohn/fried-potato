import { ActionsTypes, IDispatch, rootStateType } from './store'
import { ThunkAction } from 'redux-thunk'
import dialogsAPI, { TChat, TSubscriber } from '../api/dialogs-api'
import { message } from 'antd'
let initialState = {
      messages: [] as TSubscriber[],
}

export type InitialStateDialogsType = typeof initialState

const dialogs_reducer = (_state = initialState, action: DialogsActionsTypes): InitialStateDialogsType => {
      switch (action.type) {
            case 'social-app/dialogs/SEND-MESSAGES':
                  return { ..._state, messages: [...action.payload] }
            default:
                  return _state
      }
}

type DialogsActionsTypes = ActionsTypes<typeof DialogsActions>

let DialogsActions = {
      addMessage: (message: TSubscriber[]) => ({ type: 'social-app/dialogs/SEND-MESSAGES', payload: message } as const),
}

let _newMessageHandler: ((messages: TSubscriber[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: IDispatch) => {
      if (_newMessageHandler === null) {
            _newMessageHandler = (messages) => {
                  dispatch(DialogsActions.addMessage(messages))
            }
      }
      return _newMessageHandler
}

const startMessaging = (): ThunkAction<Promise<void>, rootStateType, undefined, DialogsActionsTypes> => async (dispatch) => {
      dialogsAPI.start()
      dialogsAPI.subscribe(newMessageHandlerCreator(dispatch))
}
const stopMessaging = (): ThunkAction<Promise<void>, rootStateType, undefined, DialogsActionsTypes> => async (dispatch) => {
      dialogsAPI.unsubscribe(newMessageHandlerCreator(dispatch))
      dialogsAPI.stop()
}
const sendMessage =
      (message: string): ThunkAction<Promise<void>, rootStateType, unknown, DialogsActionsTypes> =>
      async (dispatch) => {
            dialogsAPI.sendMessage(message)
      }
export { dialogs_reducer, DialogsActions, sendMessage, stopMessaging, startMessaging }
