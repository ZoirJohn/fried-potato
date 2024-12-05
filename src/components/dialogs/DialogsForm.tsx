import { maxLength, minLength } from '../../assets/Validators'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from '../../assets/Input'
import { IFormKeys } from './DialogsContainer'
import React from 'react'

const maximum = maxLength(30)
const minimum = minLength(2)

const AddMessageForm: React.FC<InjectedFormProps<IFormKeys>> = (props) => {
      return (
            <form onSubmit={props.handleSubmit}>
                  <Field component={Input} validate={[maximum, minimum]} name='AddMessageForm' />
                  <button>Send</button>
            </form>
      )
}

const AddMessageRedux = reduxForm<IFormKeys>({ form: 'AddMessageForm' })(AddMessageForm)

export default AddMessageRedux
