import styles from "../css/Profile.module.css"
import React from "react"

type IMeta = {
      meta: {
            error: string
            touched: boolean
      }
}
type IInput = {
      input: {
            name: string
            onBlur: () => void
            onChange: () => void
            onDragStart: () => void
            onDrop: () => void
            onFocus: () => void
            value: string
      }
}
type IProps = {
      placeholder: string
      className: string
}
type PropsType = IMeta & IInput & IProps

const Input: React.FC<PropsType> = ({ meta, input, ...props }) => {
      console.log(input)

      const { error, touched } = meta
      return (
            <div className={styles.inputTextBox}>
                  <input type='text' placeholder={props.placeholder} className={props.className} {...input} />
                  {touched && error && <span className={styles.error}>{error}</span>}
            </div>
      )
}

const InputCheckbox: React.FC<PropsType> = ({ meta, input, ...props }) => {
      const { error, touched } = meta
      return (
            <div className={styles.inputTextBox}>
                  <input type='checkbox' placeholder={props.placeholder} className={props.className} {...input} />
                  {touched && error && <span className={styles.error}>{error}</span>}
            </div>
      )
}

export { Input, InputCheckbox }
