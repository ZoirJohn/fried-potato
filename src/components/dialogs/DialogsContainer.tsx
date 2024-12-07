import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import styles from '../../css/Dialogs.module.css'
import AddMessageRedux from './DialogsForm'
import React, { useEffect, useState, useRef } from 'react'
import profilePhoto from '../../img/profile-user.webp'
import {  destroy } from 'redux-form'
import { IDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

type IProps = {}
export type IFormKeys = {
      AddMessageForm: string
}

const Dialogs: React.FC<IProps> = (props) => {
      const [messages, setMessages] = useState<{ userId: number; userName: string; message: string; photo: string }[]>([])
      const socketRef = useRef<WebSocket | null>(null)

      useEffect(() => {
            socketRef.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

            socketRef.current.addEventListener('message', (e) => {
                  setMessages((prevMessages) => [...JSON.parse(e.data)])
            })
            socketRef.current.addEventListener('close', (e) => {
                  setMessages((prevMessages) => [...prevMessages])
            })
            return () => {
                  socketRef.current?.close()
            }
      }, [])
      const sendMessage = (formData: string) => {
            if (socketRef.current) {
                  socketRef.current.send(formData)
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
                  />
            </section>
      )
}

export default withAuthRedirect(Dialogs)
