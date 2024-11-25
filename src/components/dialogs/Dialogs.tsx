import styles from '../../css/Dialogs.module.css'
import Item from './DialogsUser'
import Text from './DialogsModel'
import AddMessageRedux from './DialogsForm'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts, getTexts } from '../../selectors'
import { IDispatch } from '../../redux/store'
import { DialogsActions } from '../../redux/dialogs-reducer'
type IProps = {}
export type IFormKeys = {
      AddMessageForm: string
}

const Dialogs: React.FC<IProps> = (props) => {
      const contacts = useSelector(getContacts)
      const texts = useSelector(getTexts)
      const dispatch: IDispatch = useDispatch()
      const addMail = (formData: IFormKeys) => {
            dispatch(DialogsActions.addMessage(formData.AddMessageForm))
      }
      return (
            <section className={styles.dialogs}>
                  <div className={styles.contacts}>
                        <ul className={styles.names}>
                              {contacts.map((i) => (
                                    <Item name={i.name} key={i.id} />
                              ))}
                        </ul>
                  </div>
                  <div className={styles.chats}>
                        {texts.map((t, id) => (
                              <Text text={t.text} key={id} />
                        ))}
                  </div>
                  <AddMessageRedux
                        onSubmit={(formData: IFormKeys) => {
                              addMail(formData)
                        }}
                  />
            </section>
      )
}

export default Dialogs
