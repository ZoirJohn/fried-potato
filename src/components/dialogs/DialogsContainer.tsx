import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import styles from '../../css/Dialogs.module.css'
import AddMessageRedux from './DialogsForm'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IDispatch } from '../../redux/store'
import { DialogsActions } from '../../redux/dialogs-reducer'

type IProps = {}
export type IFormKeys = {
      AddMessageForm: string
}
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Dialogs: React.FC<IProps> = (props) => {
      const [messages, setMessages] = useState<{ userId: number; userName: string; message: string; photo: string }[]>([])
      const [currentMessage, setCurrentMessage] = useState<string>('')
      const dispatch: IDispatch = useDispatch()
      const addMail = (formData: IFormKeys) => {
            dispatch(DialogsActions.addMessage(formData.AddMessageForm))
      }
      useEffect(() => {
            ws.addEventListener('message', (e) => {
                  setMessages(JSON.parse(e.data))
            })
      }, [])
      const findOut = (e: any) => {
            messages.map((message) => (message.userName === e.target.innerHTML ? setCurrentMessage(message.message) : null))
      }
      return (
            <section className={styles.dialogs}>
                  <div className={styles.contacts}>
                        <ul className={styles.names}>
                              {messages.map((message, id) => (
                                    <li onClick={findOut} key={id}>
                                          {message.userName}
                                    </li>
                              ))}
                        </ul>
                  </div>
                  <div className={styles.chats}>
                        <ul className={styles.messages}>
                              <li>{currentMessage}</li>
                        </ul>
                  </div>
                  <AddMessageRedux
                        onSubmit={(formData: IFormKeys) => {
                              addMail(formData)
                        }}
                  />
            </section>
      )
}

export default withAuthRedirect(Dialogs)
