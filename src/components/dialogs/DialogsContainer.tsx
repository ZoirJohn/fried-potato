import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import styles from '../../css/Dialogs.module.css'
import AddMessageForm from './DialogsForm'
import React, { useEffect } from 'react'
import profilePhoto from '../../img/profile-user.webp'
import { IDispatch } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, getSubStatus } from '../../selectors'
import { startMessaging, stopMessaging } from '../../redux/dialogs-reducer'

type TProps = {}
export type IFormKeys = {
      AddMessageForm: string
}

const Dialogs: React.FC<TProps> = (props) => {
      const messages = useSelector(getMessages)
      const status = useSelector(getSubStatus)
      const dispatch: IDispatch = useDispatch()
      useEffect(() => {
            dispatch(startMessaging())
            return () => {
                  dispatch(stopMessaging())
            }
      }, [])
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
                  <AddMessageForm disabling={status!=='ready'} />
            </section>
      )
}

export default withAuthRedirect(Dialogs)
