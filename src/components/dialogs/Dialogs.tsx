import styles from '../../css/Dialogs.module.css'
import Item from './DialogsUser'
import Text from './DialogsModel'
import AddMessageRedux from './DialogsForm'
import { Chat, MessageType } from '../../types'
import React from 'react'

type IProps = {
      auth: boolean
      addMessage: (formValues: string) => void
      contacts: Array<Chat>
      router: {
            params: {}
            location: { pathname: string; search: string; hash: string; state: any; key: string }
            navigate: Function
      }
      texts: Array<MessageType>
}
export type IFormKeys = {
      AddMessageForm: string
}

const Dialogs: React.FC<IProps> = (props) => {
      return (
            <section className={styles.dialogs}>
                  <div className={styles.contacts}>
                        <ul className={styles.names}>
                              {props.contacts.map((i) => (
                                    <Item name={i.name} key={i.id} />
                              ))}
                        </ul>
                  </div>
                  <div className={styles.chats}>
                        {props.texts.map((t, id) => (
                              <Text text={t.text} key={id} />
                        ))}
                  </div>
                  <AddMessageRedux
                        onSubmit={(formData: IFormKeys) => {
                              props.addMessage(formData.AddMessageForm)
                        }}
                  />
            </section>
      )
}

export default Dialogs
