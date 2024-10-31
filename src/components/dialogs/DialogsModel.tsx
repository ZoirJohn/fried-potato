import React from 'react'
import styles from '../../css/Dialogs.module.css'

type IProps = {
      text: string
}
const Text: React.FC<IProps> = (props) => {
      return <p className={styles.chatTabs}>{props.text}</p>
}

export default Text
