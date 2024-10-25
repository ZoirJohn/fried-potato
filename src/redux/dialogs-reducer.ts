import { Chat, MessageType } from '../types'
import { ActionsTypes } from './store'

const ADD_POST_DIALOGS = 'dialogs/ADD-POST-DIALOGS'

let initialState = {
      contacts: [
            { name: 'Stephen', id: 1 },
            { name: 'Draymond', id: 2 },
            { name: 'Jonathan', id: 3 },
            { name: 'Klay', id: 4 },
      ] as Array<Chat>,
      texts: [
            { text: 'Good morning', id: 1, likeNumber: 0 },
            { text: 'How do you feel?', id: 2, likeNumber: 0 },
            { text: 'Will you play PS5 with me?', id: 3, likeNumber: 0 },
      ] as Array<MessageType>,
}

export type InitialStateDialogsType = typeof initialState

const dialogs_reducer = (_state = initialState, action: DialogsActionsTypes): InitialStateDialogsType => {
      switch (action.type) {
            case ADD_POST_DIALOGS:
                  let newPost = { text: action.text, id: Math.floor(Math.random() * 10), likeNumber: Math.floor(Math.random() * 10) }
                  return { ..._state, texts: [..._state.texts, newPost] }
            default:
                  return _state
      }
}

type DialogsActionsTypes = ActionsTypes<typeof DialogsActions>

let DialogsActions = {
      addMessage: (text: string) => ({ type: ADD_POST_DIALOGS, text } as const),
}

export { dialogs_reducer, DialogsActions }
