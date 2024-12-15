import { ActionsTypes, IDispatch, rootStateType } from './store'
import { ThunkAction } from 'redux-thunk'
import dialogsAPI, { TChat, TStatus, TSubscriber } from '../api/dialogs-api'
let initialState = {
      messages: [] as TSubscriber[],
      status: 'pending' as TStatus,
}

export type InitialStateDialogsType = typeof initialState

const dialogs_reducer = (_state = initialState, action: DialogsActionsTypes): InitialStateDialogsType => {
      switch (action.type) {
            case 'social-app/dialogs/MESSAGES-RECEIVED':
                  const newAllowed = action.payload.length < 2 ? [..._state.messages, ...action.payload] : [...action.payload]
                  return { ..._state, messages: [...newAllowed] }
            case 'social-app/dialogs/STATUS-CHANGED':
                  return { ..._state, status: action.payload }
            default:
                  return _state
      }
}

type DialogsActionsTypes = ActionsTypes<typeof DialogsActions>

let DialogsActions = {
      addMessage: (message: TSubscriber[]) => ({ type: 'social-app/dialogs/MESSAGES-RECEIVED', payload: message } as const),
      changeStatus: (status: TStatus) => ({ type: 'social-app/dialogs/STATUS-CHANGED', payload: status } as const),
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
let _statusHandler: ((status: TStatus) => void) | null = null
const statusHandlerCreator = (dispatch: IDispatch) => {
      if (_statusHandler === null) {
            _statusHandler = (status) => {
                  dispatch(DialogsActions.changeStatus(status))
            }
      }
      return _statusHandler
}

const startMessaging = (): ThunkAction<Promise<void>, rootStateType, undefined, DialogsActionsTypes> => async (dispatch) => {
      dialogsAPI.start()
      dialogsAPI.subscribe('messages', newMessageHandlerCreator(dispatch))
      dialogsAPI.subscribe('status', statusHandlerCreator(dispatch))
}
const stopMessaging = (): ThunkAction<Promise<void>, rootStateType, undefined, DialogsActionsTypes> => async (dispatch) => {
      dialogsAPI.unsubscribe('messages', newMessageHandlerCreator(dispatch))
      dialogsAPI.unsubscribe('status', statusHandlerCreator(dispatch))
      dialogsAPI.stop()
}
const sendMessage =
      (message: string): ThunkAction<Promise<void>, rootStateType, unknown, DialogsActionsTypes> =>
      async (dispatch) => {
            dialogsAPI.sendMessage(message)
      }
export { dialogs_reducer, DialogsActions, sendMessage, stopMessaging, startMessaging }
