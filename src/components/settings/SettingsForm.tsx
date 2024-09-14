import { InjectedFormProps, reduxForm } from "redux-form"
import styles from "../../css/Settings.module.css"
import createField from "../../assets/createField"
import { minLength, required } from "../../assets/Validators"
import React from "react"

const inputFields = [
      ["lookingForAJob", "Looking for a job", true],
      ["lookingForAJobDescription", "Description"],
      ["fullName", "Full name"],
      ["aboutMe", "About me"],
      ["github", "GitHub"],
      ["instagram", "Instagram"],
      ["twitter", "Twitter"],
]

const minimum = minLength(10)

type PropsType = {}

const SettingsForm: React.FC<InjectedFormProps<PropsType>> = (props) => {
      return (
            <form onSubmit={props.handleSubmit} className={styles.fieldForm}>
                  <h3>Profile Settings</h3>
                  {inputFields.map((input, id) => {
                        return (
                              <label key={id} className={styles.fieldLabel}>
                                    {createField(input[0], input[1], input[2], [required])}
                              </label>
                        )
                  })}
                  <button type='submit'>Submit</button>
            </form>
      )
}

export default reduxForm({ form: "settings_data" })(SettingsForm)
