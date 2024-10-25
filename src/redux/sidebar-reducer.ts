import { MessageType } from '../types'

let initialState = {
      posts: [
            { text: 'Hello', likeNumber: 12 },
            { text: 'How do you do?', likeNumber: 18 },
            { text: 'Pretty fine', likeNumber: 4 },
      ] as Array<MessageType>,
      newPost: null as string | null,
}

export type InitialStateSidebarType = typeof initialState

const sidebar_reducer = (_state = initialState, action: any): InitialStateSidebarType => {
      return {
            posts: [
                  { text: 'Hello', likeNumber: 12 },
                  { text: 'How do you do?', likeNumber: 18 },
                  { text: 'Pretty fine', likeNumber: 4 },
            ] as any,
            newPost: null as string | null,
      }
}

export { sidebar_reducer }
