import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { useDispatch, useSelector } from 'react-redux'
import { savePhoto, saveProfile } from '../../redux/profile-reducer'
import { ChangeEvent, FC, useState } from 'react'
import styles from '../../css/Settings.module.css'
import SettingsFormRedux from './SettingsForm'
import classNames from 'classnames'
import { IDispatch } from '../../redux/store'
import { PhotosType } from '../../types'
import { getId, getProfileId } from '../../selectors'
import { compose } from 'redux'

type IProps = {}
type FormKeysType = {
      lookingForAJob: boolean
      lookingForAJobDescription: string
      fullName: string
      aboutMe: string
      github: string
      instagram: string
      twitter: string
}
const Settings: FC = () => {
      const [warning, setWarning] = useState(false)
      const ownId = useSelector(getId)
      const uploadedId = useSelector(getProfileId)
      const dispatch: IDispatch = useDispatch()
      const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                  dispatch(savePhoto(e.target.files[0] as unknown as PhotosType))
                  setWarning(true)
            }
      }
      const formDataSubmit = (formData: FormKeysType) => {
            const data = {
                  aboutMe: formData.aboutMe,
                  contacts: {
                        instagram: formData.instagram,
                        twitter: formData.twitter,
                        github: formData.github,
                  },
                  fullName: formData.fullName,
                  lookingForAJob: formData.lookingForAJob,
                  lookingForAJobDescription: formData.lookingForAJobDescription,
            }
            dispatch(saveProfile(data))
      }
      return (
            <ul className={`${styles.settingsBox} section`}>
                  <p className={classNames(styles.warning, { [styles.trueError]: warning })}>
                        <span onClick={() => setWarning(false)}>X</span>Picture has been replaced!
                  </p>
                  {ownId === uploadedId ? (
                        <>
                              <li>
                                    <input onChange={uploadPhoto} type='file' placeholder='Change profile photo' />
                              </li>
                              <li>
                                    <SettingsFormRedux onSubmit={formDataSubmit} />
                              </li>
                        </>
                  ) : (
                        'Switch to your account (Go to profile and come back)'
                  )}
            </ul>
      )
}

export default compose(withAuthRedirect)(Settings)
