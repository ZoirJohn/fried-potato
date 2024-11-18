import PostModel from './PostModel'
import background from '../../img/background.jpeg'
import profileUser from '../../img/profile-user.webp'
import React, { ChangeEvent, useState } from 'react'
import styles from '../../css/Profile.module.css'
import AddPostRedux from './ProfileForm'
import { MessageType, ProfileType } from '../../types'

type PropsType = {
      profileUser: ProfileType | null
      status: string | undefined
      posts: Array<MessageType>
      id: number
      addPost: (text: string) => void
      updateStatus: (text: string, id: number) => void
}
type FormType = {
      AddPostForm: string
}

const Profile: React.FC<PropsType> = (props) => {
      let [edit, setStatus] = useState(false)
      let [currentWord, setCurrentWord] = useState('')
      let [word, setWord] = useState(props.status)
      const handleStatus = () => {
            setStatus((edit) => !edit)
            if (edit) {
                  props.updateStatus(currentWord, props.id)
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
                        <img src={props.profileUser?.photos?.large || profileUser} alt='background' />
                        <div className={styles.info}>
                              <p>
                                    <span>Full name:</span> {props.profileUser?.fullName || 'Carnage'}
                              </p>
                              <div className={styles.statusBox}>
                                    <span>Status: </span>
                                    {!edit && (
                                          <pre className={styles['status-word']} onDoubleClick={handleStatus}>
                                                {typeof word === 'string' ? word : 'LOADING... Please refresh'}
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
                                    <span>Job Hunting:</span> {props.profileUser?.lookingForAJob ? 'Yes' : 'No'}
                              </p>
                              <p>
                                    <span>About Me:</span> {props.profileUser?.aboutMe}
                              </p>
                              <p>
                                    <span>Instagram:</span>{' '}
                                    <a href={props.profileUser?.contacts.instagram} target='_blank'>
                                          Link
                                    </a>
                              </p>
                              <p>
                                    <span>Twitter:</span>{' '}
                                    <a href={props.profileUser?.contacts.twitter} target='_blank'>
                                          Link
                                    </a>
                              </p>
                        </div>
                  </div>
                  <div className={styles.messages}>
                        <AddPostRedux
                              onSubmit={(formData: FormType) => {
                                    props.addPost(formData.AddPostForm)
                              }}
                        />
                        <ul className={styles.messagesBox}>
                              {props.posts.map((p: MessageType, id: number) => (
                                    <PostModel text={p.text} likeNumber={p.likeNumber} key={id} />
                              ))}
                        </ul>
                  </div>
            </section>
      )
}

export default Profile
