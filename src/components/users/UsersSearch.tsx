import { Formik } from 'formik'
import styles from '../../css/Users.module.css'

type IProps = {
      searchUsers: (term: string) => void
}

const UsersSearch: React.FC<IProps> = (props) => {
      return (
            <Formik
                  initialValues={{ name: '' }}
                  onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                              props.searchUsers(values.name)
                              setSubmitting(false)
                        }, 1000)
                  }}
                  className={styles.formBlank}
            >
                  {({ values, handleChange, handleBlur, errors, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                              <input type='text' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} className={styles.formInput} />
                              {errors.name}
                              <button type='submit' disabled={isSubmitting} className={styles.formBtn}>
                                    Submit
                              </button>
                        </form>
                  )}
            </Formik>
      )
}

export default UsersSearch
