let subscribers: TChat[] = []

let ws: WebSocket | null



const messageHandler = (e: MessageEvent) => {
      const messages = JSON.parse(e.data)
      subscribers.forEach((s) => s(messages))
}
const createChannel = () => {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', closeHandler)
      ws.addEventListener('message', messageHandler)
}
const closeHandler = () => {
      setTimeout(createChannel, 3000)
}
const dialogsAPI = {
      start() {
          createChannel()
      },
      stop: () => {
            subscribers = []
            ws?.removeEventListener('close', closeHandler)
            ws?.removeEventListener('message', messageHandler)
            ws?.close()
      },
      subscribe: (callback: TChat) => {
            subscribers.push(callback)
            return () => {
                  subscribers = subscribers.filter((s) => s !== callback)
            }
      },
      unsubscribe: (callback: TChat) => {
            subscribers = subscribers.filter((s) => s !== callback)
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
