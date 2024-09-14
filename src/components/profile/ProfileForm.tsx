import { maxLength, minLength, required } from "../../assets/Validators"
import styles from "../../css/Profile.module.css"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { Input } from "../../assets/Input"
import React from "react"

const maximum = maxLength(30)
const minimum = minLength(2)

type PropsType = {
      AddPostForm: string
}

const AddPostForm: React.FC<InjectedFormProps<PropsType>> = (props) => {
      return (
            <form action='' onSubmit={props.handleSubmit} className={styles.messagesForm}>
                  <Field component={Input} type='text' placeholder='Enter text...' name='AddPostForm' className={styles.inputText} validate={[maximum, minimum]} />
                  <button>Submit</button>
            </form>
      )
}

const AddPostRedux = reduxForm<PropsType>({ form: "AddPostForm" })(AddPostForm)

export default AddPostRedux
