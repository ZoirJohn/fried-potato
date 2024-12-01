import { FC, memo } from 'react'
import { Field, Formik } from 'formik'
import styles from '../../css/Users.module.css'
import { useSelector } from 'react-redux'
import { getFilter } from '../../selectors'
type IProps = {
      setFilterSearch: (term: string, onlyFriends: null | boolean) => void
}

const UsersSearch: FC<IProps> = memo((props) => {
      const filter = useSelector(getFilter)
      return (
            <Formik
                  enableReinitialize
                  initialValues={{ name: filter.term, onlyFriends: String(filter.onlyFriends) }}
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
                        <form className={styles.searchForm} onSubmit={handleSubmit}>
                              <Field type='text' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} className={styles.searchFormInput} />
                              <button type='submit' disabled={isSubmitting} className={styles.searchFormBtn}>
                                    Search
                              </button>
                              <Field name='onlyFriends' as='select'>
                                    <option value='null'>All</option>
                                    <option value='true'>Only followed</option>
                                    <option value='false'>Only unfollowed</option>
                              </Field>
                        </form>
                  )}
            </Formik>
      )
})

export default UsersSearch