import { maxLength, minLength, required } from '../../assets/Validators'
import styles from '../../css/Profile.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import React from 'react'
import createField from '../../assets/createField'

const maximum = maxLength(30)
const minimum = minLength(2)

type PropsType = {
      AddPostForm: string
}

const AddPostForm: React.FC<InjectedFormProps<PropsType>> = (props) => {
      return (
            <form action='' onSubmit={props.handleSubmit} className={styles.messagesForm}>
                  {createField<Extract<keyof PropsType, string>>('AddPostForm', 'Enter text...', [maximum, minimum], undefined)}
                  {/* <Field component={Input} type='text' placeholder='Enter text...' name='AddPostForm' className={styles.inputText} validate={} /> */}
                  <button>Submit</button>
            </form>
      )
}

const AddPostRedux = reduxForm<PropsType>({ form: 'AddPostForm' })(AddPostForm)

export default AddPostRedux
