import { NavLink } from 'react-router-dom'
import { FC, useEffect } from 'react'
import { UserType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFilter, getInProgress, getOverall, getPageSize, getUsersList } from '../../selectors'
import { getUsersThunk } from '../../redux/users-reducer'
import { IDispatch } from '../../redux/store'
import { follow, unfollow } from '../../redux/users-reducer'
import styles from '../../css/Users.module.css'
import Paginator from '../../assets/Paginator'
import UsersSearch from './UsersSearch'

type IProps = {}

const Users: FC<IProps> = (props) => {
      const users = useSelector(getUsersList)
      const overall = useSelector(getOverall)
      const pageSize = useSelector(getPageSize)
      const currentPage = useSelector(getCurrentPage)
      const filter = useSelector(getFilter)
      const inProgress = useSelector(getInProgress)
      const dispatch: IDispatch = useDispatch()

      useEffect(() => {
            dispatch(getUsersThunk(currentPage, pageSize, filter.term, filter.onlyFriends))
      }, [])
      const setCurrentPageUsers = (page: number) => {
            dispatch(getUsersThunk(page, pageSize, filter.term, filter.onlyFriends))
      }
      const setFilterSearch = (term: string, onlyFriends: boolean | null) => {
            dispatch(getUsersThunk(1, pageSize, term, onlyFriends, true))
      }
      const followUser = (userId: number) => {
            dispatch(follow(userId))
      }
      const unfollowUser = (userId: number) => {
            dispatch(unfollow(userId))
      }
      return (
            <section className={styles.users}>
                  <Paginator overall={overall} pageSize={pageSize} currentPage={currentPage} setCurrentPageUsers={setCurrentPageUsers} portionSize={3} />
                  <UsersSearch setFilterSearch={setFilterSearch} filter={filter} />

                  <ul className={styles.usersBox}>
                        {users.map((u: UserType) => (
                              <li className={styles.user} key={u.id}>
                                    <NavLink to={'/profile/' + u.id}>
                                          <img src={u.photos?.small || `https://icones.pro/wp-content/uploads/2021/04/icone-sourire-violet.png`} alt='MyProfile' />
                                    </NavLink>
                                    <p>{u.name}</p>
                                    {u.followed ? (
                                          <button onClick={() => unfollowUser(u.id)} disabled={inProgress.some((i: number) => i === u.id)}>
                                                Unfollow
                                          </button>
                                    ) : (
                                          <button onClick={() => followUser(u.id)} disabled={inProgress.some((i: number) => i === u.id)}>
                                                Follow
                                          </button>
                                    )}
                              </li>
                        ))}
                  </ul>
            </section>
      )
}

export default Users
