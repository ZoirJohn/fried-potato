import PostModel from './PostModel'
import background from '../../img/background.jpeg'
import profileUser from '../../img/profile-user.webp'
import React, { ChangeEvent, useState } from 'react'
import styles from '../../css/Profile.module.css'
import AddPostRedux from './ProfileForm'
import { MessageType, ProfileType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getId, getPosts, getProfileUser, getStatus } from '../../selectors'
import { IDispatch } from '../../redux/store'
import { ProfileActions, updateStatus } from '../../redux/profile-reducer'

type PropsType = {}
type FormType = {
      AddPostForm: string
}

const Profile: React.FC<PropsType> = (props) => {
      const status = useSelector(getStatus)
      const profileUser = useSelector(getProfileUser)
      const posts = useSelector(getPosts)
      const dispatch: IDispatch = useDispatch()
      const addMail = (formData: FormType) => {
            dispatch(ProfileActions.addPost(formData.AddPostForm))
      }
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
            <section className={styles.profile}>
                  <img src={background} alt='background' />
                  <div className={styles.dataBox}>
                        <img src={profileUser?.photos?.large as string} alt='background' />
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
                              <p>
                                    <span>Education:</span> Embry-Riddle
                              </p>
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
                        </div>
                  </div>
                  <div className={styles.messages}>
                        <AddPostRedux
                              onSubmit={(formData: FormType) => {
                                    addMail(formData)
                              }}
                        />
                        <ul className={styles.messagesBox}>
                              {posts.map((p: MessageType, id: number) => (
                                    <PostModel text={p.text} likeNumber={p.likeNumber} key={id} />
                              ))}
                        </ul>
                  </div>
            </section>
      )
}

export default Profile
