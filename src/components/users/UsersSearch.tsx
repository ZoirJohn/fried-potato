import { Field, Formik } from 'formik'
import styles from '../../css/Users.module.css'

type IProps = {
      filter: {
            term: string
            onlyFriends: boolean | null
      }
      // searchUsersThunk: (currentPage: number, pageSize: number, onlyFriends: boolean | null) => void
      setFilterSearch: (term: string, onlyFriends: boolean | null) => void
}

const UsersSearch: React.FC<IProps> = (props) => {
      return (
            <Formik
                  initialValues={{ name: '', onlyFriends: '' }}
                  onSubmit={(values, { setSubmitting }) => {
                        if (values.onlyFriends === 'true') {
                              props.setFilterSearch(values.name, true)
                        } else if (values.onlyFriends === 'false') {
                              props.setFilterSearch(values.name, false)
                        } else {
                              props.setFilterSearch(values.name, null)
                        }
                        setSubmitting(false)
                  }}
                  className={styles.formBlank}
            >
                  {({ values, handleChange, handleBlur, errors, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                              <Field type='text' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} className={styles.formInput} />
                              <button type='submit' disabled={isSubmitting} className={styles.formBtn}>
                                    Search
                              </button>
                              <Field name='onlyFriends' as='select'>
                                    <option value='true'>Only followed</option>
                                    <option value='false'>Only unfollowed</option>
                                    <option value='null'>All</option>
                              </Field>
                        </form>
                  )}
            </Formik>
      )
}

export default UsersSearch
