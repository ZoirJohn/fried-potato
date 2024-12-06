import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import styles from '../../css/Dialogs.module.css'
import AddMessageRedux from './DialogsForm'
import React, { useEffect, useState } from 'react'
import profilePhoto from '../../img/profile-user.webp'

type IProps = {}
export type IFormKeys = {
      AddMessageForm: string
}
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Dialogs: React.FC<IProps> = (props) => {
      const [messages, setMessages] = useState<{ userId: number; userName: string; message: string; photo: string }[]>([])
      const sendMessage = (formData: string) => {
            ws.send(formData)
      }
      useEffect(() => {
            ws.addEventListener('message', (e) => {
                  setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
            })
      }, [])
      messages.splice(0, 16)
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
