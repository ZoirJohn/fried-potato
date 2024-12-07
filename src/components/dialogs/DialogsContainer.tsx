import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import styles from '../../css/Dialogs.module.css'
import AddMessageRedux from './DialogsForm'
import React, { useEffect, useState, useRef } from 'react'
import profilePhoto from '../../img/profile-user.webp'
import { destroy } from 'redux-form'
import { IDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

type IProps = {}
export type IFormKeys = {
      AddMessageForm: string
}

const Dialogs: React.FC<IProps> = (props) => {
      const [messages, setMessages] = useState<{ userId: number; userName: string; message: string; photo: string }[]>([])
      const ws = useRef<WebSocket | null>(null)

      useEffect(() => {
            ws.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

            ws.current.addEventListener('message', (e) => {
                  setMessages((prevMessages) => [...JSON.parse(e.data)])
            })
            ws.current.addEventListener('close', (e) => {
                  setMessages((prevMessages) => [...prevMessages])
            })
            return () => {
                  ws.current?.close()
            }
      }, [])
      const sendMessage = (formData: string) => {
            if (ws.current) {
                  ws.current.send(formData)
                  dispatch(destroy('AddMessageForm'))
            }
      }
      const dispatch: IDispatch = useDispatch()
      return (
            <section className={`${styles.dialogs} section`}>
                  <ul className={styles.messages}>
                        {messages.map((message, id) => (
                              <li key={id} className={styles.profileData}>
                                    <div className={styles.contact}>
                                          <img src={message.photo || profilePhoto} alt='profilePhoto' />
                                    </div>
                                    <div className={styles.messageText}>
                                          <p>{message.message}</p>
                                          <h3>{message.userName}</h3>
                                    </div>
                              </li>
                        ))}
                  </ul>
                  <AddMessageRedux
                        onSubmit={(formData: IFormKeys) => {
                              sendMessage(formData.AddMessageForm)
                        }}
                        disabling={ws.current?.readyState !== ws.current?.OPEN}
                  />
            </section>
      )
}

export default withAuthRedirect(Dialogs)
