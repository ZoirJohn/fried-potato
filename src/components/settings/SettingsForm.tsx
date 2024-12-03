import { InjectedFormProps, reduxForm } from 'redux-form'
import styles from '../../css/Settings.module.css'
import createField from '../../assets/createField'
import { required } from '../../assets/Validators'
import { Button } from 'antd'
import React from 'react'

const inputFields: Array<[FormKeysValues, string, boolean?]> = [
      ['lookingForAJob', 'Looking for a job', true],
      ['lookingForAJobDescription', 'Description'],
      ['fullName', 'Full name'],
      ['aboutMe', 'About me'],
      ['github', 'GitHub'],
      ['instagram', 'Instagram'],
      ['twitter', 'Twitter'],
]

type FormKeysType = {
      lookingForAJob: boolean
      lookingForAJobDescription: string
      fullName: string
      aboutMe: string
      github: string
      instagram: string
      twitter: string
}
type FormKeysValues = Extract<keyof FormKeysType, string>

const SettingsForm: React.FC<InjectedFormProps<FormKeysType>> = (props) => {
      return (
            <form onSubmit={props.handleSubmit} className={styles.fieldForm}>
                  <h3>Profile Settings</h3>
                  {inputFields.map((input, id) => {
                        return (
                              <label key={id} className={styles.fieldLabel}>
                                    {createField<FormKeysValues>(input[0], input[1], [required], input[2])}
                              </label>
                        )
                  })}
                  <Button type='primary' htmlType='submit'>Submit</Button>
            </form>
      )
}

export default reduxForm<FormKeysType>({ form: 'settings_data' })(SettingsForm)
