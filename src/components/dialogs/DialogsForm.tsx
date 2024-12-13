import { maxLength, minLength, required } from '../../assets/Validators'
import { MouseEvent, FC, useState } from 'react'
import { IDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/dialogs-reducer'

const maximum = maxLength(30)
const minimum = minLength(2)
type IProps = {
      disabling: number | undefined
}
const AddMessageForm: FC<IProps> = (props) => {
      const [text, setText] = useState('')
      const dispatch: IDispatch = useDispatch()
      const setTextHandler = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            dispatch(sendMessage(text))
            setText('')
      }
      return (
            <form>
                  <input type='text' onChange={(e) => setText(e.currentTarget.value)} value={text} />
                  <button onClick={(e) => setTextHandler(e)} type='submit' disabled={false}>
                        Send
                  </button>
            </form>
      )
}
export default AddMessageForm
