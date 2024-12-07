import { maxLength, minLength } from '../../assets/Validators'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from '../../assets/Input'
import { IFormKeys } from './DialogsContainer'
import React from 'react'

const maximum = maxLength(30)
const minimum = minLength(2)
type IProps = {
      disabling: boolean
}
const AddMessageForm: React.FC<InjectedFormProps<IFormKeys, IProps> & IProps> = (props) => {
      return (
            <form onSubmit={props.handleSubmit}>
                  <Field component={Input} validate={[maximum, minimum]} name='AddMessageForm' />
                  <button type='submit' disabled={props.disabling}>
                        Send
                  </button>
            </form>
      )
}

const AddMessageRedux = reduxForm<IFormKeys, IProps>({ form: 'AddMessageForm' })(AddMessageForm)

export default AddMessageRedux
