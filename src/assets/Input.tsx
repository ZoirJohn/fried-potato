import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import styles from "../css/Profile.module.css"
import React from "react"

type IProps = {
      placeholder: string
      className: string
}
type PropsType = IProps

const Input: React.FC<WrappedFieldProps & PropsType> = ({ meta, input, ...props }) => {
      const { error, touched } = meta
      return (
            <div className={styles.inputTextBox}>
                  <input type='text' placeholder={props.placeholder} className={props.className} {...input} />
                  {touched && error && <span className={styles.error}>{error}</span>}
            </div>
      )
}

const InputCheckbox: React.FC<WrappedFieldProps & PropsType> = ({ meta, input, ...props }) => {
      const { error, touched } = meta
      return (
            <div className={styles.inputTextBox}>
                  <input type='checkbox' placeholder={props.placeholder} className={props.className} {...input} />
                  {touched && error && <span className={styles.error}>{error}</span>}
            </div>
      )
}

export { Input, InputCheckbox }
