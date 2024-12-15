const subscribers = {
      messages: [] as TChat[],
      status: [] as TStatusCallback[],
}

let ws: WebSocket | null = null

const messageHandler = (e: MessageEvent) => {
      const messages = JSON.parse(e.data)
      subscribers['messages'].forEach((s) => s(messages))
      subscribers['status'].forEach((s) => s('ready'))
}
const openHandler = () => {}
const closeHandler = () => {
      setTimeout(createChannel, 3000)
      console.log('CLOSE')
}
const cleanUp = () => {
      subscribers['status'].forEach((s) => s('pending'))
      ws?.removeEventListener('close', closeHandler)
      ws?.removeEventListener('message', messageHandler)
      ws?.close()
}
const createChannel = () => {
      cleanUp()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('open', openHandler)
      ws.addEventListener('close', closeHandler)
      ws.addEventListener('message', messageHandler)
}

const dialogsAPI = {
      start: () => {
            createChannel()
      },
      stop: () => {
            subscribers['messages'] = []
            subscribers['status'] = []
            cleanUp()
      },
      subscribe: (ev: TEvent, callback: TChat | TStatusCallback) => {
            // @ts-ignore
            subscribers[ev].push(callback)
            return () => {
                  // @ts-ignore
                  subscribers[ev] = subscribers[ev].filter((s) => s !== callback)
            }
      },
      unsubscribe: (ev: TEvent, callback: TChat | TStatusCallback) => {
            // @ts-ignore
            subscribers[ev] = subscribers[ev].filter((s) => s !== callback)
      },
      sendMessage: (message: string) => {
            ws?.send(message)
      },
}

export default dialogsAPI

export type TSubscriber = {
      userId: number
      message: string
      photo: string
      userName: string
}
export type TChat = (messages: TSubscriber[]) => void
export type TStatusCallback = (status: TStatus) => void

export type TEvent = 'messages' | 'status'

export type TStatus = 'ready' | 'pending'
