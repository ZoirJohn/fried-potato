import { maxLength, minLength, required } from '../../assets/Validators'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from '../../assets/Input'
import { IFormKeys } from './DialogsContainer'
import React, { FC, useState } from 'react'
import { IDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/dialogs-reducer'

const maximum = maxLength(30)
const minimum = minLength(2)
type IProps = {
      disabling: number | undefined
}
const AddMessageForm:FC = (props) => {
      const [text, setText] = useState('')
      const dispatch: IDispatch = useDispatch()
      return (
            <form>
                  <textarea onChange={(e) => setText(e.currentTarget.value)} value={text}></textarea>
                  <button onClick={() => dispatch(sendMessage(text))} type='submit' disabled={false}>
                        Send
                  </button>
            </form>
      )
}

const AddMessageRedux = reduxForm<IFormKeys, IProps>({ form: 'AddMessageForm' })(AddMessageForm)

export default AddMessageRedux
