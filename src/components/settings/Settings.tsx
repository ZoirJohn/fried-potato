import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { savePhoto, saveProfile } from '../../redux/profile-reducer'
import { ChangeEvent, Component, ComponentType } from 'react'
import styles from '../../css/Settings.module.css'
import SettingsFormRedux from './SettingsForm'
import classNames from 'classnames'
import { rootStateType } from '../../redux/store'

type IState = {
      ownId: number | null
      uploadedId: number | undefined
      payload: any
}
type IDispatch = {
      savePhoto: (file: any) => void
      saveProfile: (formValues: any) => void
}
type OwnState = {
      warning: boolean
      hideWarning: boolean
      form: boolean
}
type IProps = IState & IDispatch
type FormKeysType = {
      lookingForAJob: string
      lookingForAJobDescription: string
      fullName: string
      aboutMe: string
      github: string
      instagram: string
      twitter: string
}

class Settings extends Component<IProps, OwnState> {
      constructor(props: IProps) {
            super(props)
            this.state = {
                  warning: false as boolean,
                  hideWarning: false as boolean,
                  form: false as boolean,
            }
            this.setWarning = this.setWarning.bind(this)
            this.setHideWarning = this.setHideWarning.bind(this)
      }
      setWarning = () => {
            this.setState((prevState: OwnState) => ({ warning: !prevState.warning }))
      }
      setHideWarning = () => {
            this.setState((prevState: OwnState) => ({ hideWarning: !prevState.hideWarning }))
      }
      componentDidUpdate() {
            if (!this.state.warning) {
                  this.setWarning()
            }
      }
      render() {
            const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                        this.props.savePhoto(e.target.files[0])
                  }
            }
            const formDataSubmit = (formData: FormKeysType) => {
                  this.props.saveProfile({ ...formData, contacts: { twitter: formData.twitter, instagram: formData.instagram, github: formData.github } })
            }
            return (
                  <ul className={styles.settingsBox}>
                        <p className={classNames(styles.warning, { [styles.warn]: this.state.warning, [styles.hideWarn]: this.state.hideWarning })}>
                              <span onClick={this.setHideWarning}>X</span>Picture has been replaced!
                        </p>
                        {this.props.ownId === this.props.uploadedId ? (
                              <>
                                    <li>
                                          <input onChange={uploadPhoto} type='file' placeholder='Change profile photo' />
                                    </li>
                                    <li>
                                          <SettingsFormRedux {...this.props} onSubmit={formDataSubmit} />
                                    </li>
                              </>
                        ) : (
                              'Switch to your account (Go to profile and come back)'
                        )}
                  </ul>
            )
      }
}
const mapStateToProps = (state: rootStateType): IState => {
      return {
            ownId: state.auth.id,
            uploadedId: state.profile.profileUser?.userId,
            payload: state.profile.profileUser?.photos,
      }
}

export default compose<ComponentType>(connect<IState, IDispatch, OwnState, rootStateType>(mapStateToProps, { savePhoto, saveProfile }), withAuthRedirect)(Settings)
