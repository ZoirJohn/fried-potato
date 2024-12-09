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
      const [innerReadyState, setReady] = useState(0)
      useEffect(() => {
            ws.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

            ws.current.addEventListener('message', (e) => {
                  setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
            })
            ws.current.addEventListener('close',()=>{
                  console.log('close')
            })
      }, [])
      useEffect(() => {
            const handleOffline = () => {
                  setReady(1)
            }
            const handleOnline = () => {
                  setReady(0)
            }

            window.addEventListener('offline', handleOffline)
            window.addEventListener('online', handleOnline)

            return () => {
                  window.removeEventListener('offline', handleOffline)
                  window.removeEventListener('offline', handleOnline)
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
                        disabling={ws.current?.readyState && innerReadyState}
                  />
            </section>
      )
}

export default withAuthRedirect(Dialogs)
