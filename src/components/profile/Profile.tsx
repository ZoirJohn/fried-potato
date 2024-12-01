import PostModel from './PostModel'
import background from '../../img/background.jpeg'
import  { FC, ChangeEvent, useState } from 'react'
import styles from '../../css/Profile.module.css'
import AddPostRedux from './ProfileForm'
import { MessageType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, getProfileUser, getStatus } from '../../selectors'
import { IDispatch } from '../../redux/store'
import { ProfileActions, updateStatus } from '../../redux/profile-reducer'
import { Layout, theme } from 'antd'
import profilePhoto from '../../img/profile-user.webp'
type FormType = {
      AddPostForm: string
}


const { Content } = Layout

const Profile: FC = (props) => {
      const status = useSelector(getStatus)
      const profileUser = useSelector(getProfileUser)
      const posts = useSelector(getPosts)
      const dispatch: IDispatch = useDispatch()
      const addMail = (formData: FormType) => {
            dispatch(ProfileActions.addPost(formData.AddPostForm))
      }
       const {
             token: { colorBgContainer, borderRadiusLG },
       } = theme.useToken()
      let [edit, setStatus] = useState(false)
      let [currentWord, setCurrentWord] = useState('')
      let [word, setWord] = useState(status)
      const handleStatus = () => {
            setStatus((edit) => !edit)
            if (edit) {
                  dispatch(updateStatus(currentWord))
            }
      }
      const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
            setCurrentWord((currentWord = e.target.value))
      }
      const handleWord = () => {
            setWord((word = currentWord))
      }
      return (
            <Content
                  style={{
                        margin: 0,
                        padding: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'hidden',
                  }}
            >
                  <section className={styles.profile}>
                        <img src={background} alt='background' />
                        <div className={styles.dataBox}>
                              <img src={(profileUser?.photos?.large as string) || profilePhoto} alt='background' />
                              <div className={styles.info}>
                                    <p>
                                          <span>Full name:</span> {profileUser?.fullName || 'Carnage'}
                                    </p>
                                    <div className={styles.statusBox}>
                                          <span>Status: </span>
                                          {!edit && (
                                                <pre className={styles['status-word']} onDoubleClick={handleStatus}>
                                                      {typeof word === 'string' ? word : status && 'LOADING... Please refresh'}
                                                </pre>
                                          )}
                                          <pre onDoubleClick={handleStatus}>
                                                {edit && (
                                                      <input
                                                            value={word}
                                                            onChange={(e) => {
                                                                  handleClick(e)
                                                                  handleWord()
                                                            }}
                                                            type='text'
                                                      />
                                                )}
                                          </pre>
                                    </div>
                                    <p></p>
                                    <p>
                                          <span>Job Hunting:</span> {profileUser?.lookingForAJob ? 'Yes' : 'No'}
                                    </p>
                                    <p>
                                          <span>About Me:</span> {profileUser?.aboutMe}
                                    </p>
                                    <p>
                                          <span>Instagram:</span>{' '}
                                          <a href={profileUser?.contacts.instagram} target='_blank'>
                                                Link
                                          </a>
                                    </p>
                                    <p>
                                          <span>Twitter:</span>{' '}
                                          <a href={profileUser?.contacts.twitter} target='_blank'>
                                                Link
                                          </a>
                                    </p>
                                    <p>
                                          <span>Github:</span>{' '}
                                          <a href={profileUser?.contacts.github} target='_blank'>
                                                Link
                                          </a>
                                    </p>
                              </div>
                        </div>
                        <AddPostRedux
                              onSubmit={(formData: FormType) => {
                                    addMail(formData)
                              }}
                        />
                        <div className={styles.messages}>
                              <ul className={styles.messagesBox}>
                                    {posts.map((p: MessageType, id: number) => (
                                          <PostModel text={p.text} likeNumber={p.likeNumber} key={id} />
                                    ))}
                              </ul>
                        </div>
                  </section>
            </Content>
      )
}

export default Profile
