import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { UserType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFilter, getInProgress, getOverall, getPageSize, getUsersList } from '../../selectors'
import { getUsersThunk } from '../../redux/users-reducer'
import { IDispatch } from '../../redux/store'
import { follow, unfollow } from '../../redux/users-reducer'
import styles from '../../css/Users.module.css'
import UsersSearch from './UsersSearch'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'
import { Col, Pagination, Row } from 'antd'
import { Button, Card, Flex, Typography, Grid, Tag } from 'antd'
import { wrap } from 'module'

type TProps = {}

const cardStyle: React.CSSProperties = {
      width: '100%',
}

const imgStyle: React.CSSProperties = {
      display: 'block',
      width: 73,
}
const { useBreakpoint } = Grid
const Users: FC<TProps> = (props) => {
      const users = useSelector(getUsersList)
      const overall = useSelector(getOverall)
      const pageSize = useSelector(getPageSize)
      const currentPage = useSelector(getCurrentPage)
      const filter = useSelector(getFilter)
      const inProgress = useSelector(getInProgress)
      const dispatch: IDispatch = useDispatch()
      const navigate = useNavigate()
      const [term, setTerm] = useQueryParam('term', StringParam)
      const [friend, setFriend] = useQueryParam('friend', StringParam)
      const [page, setPage] = useQueryParam('friend', NumberParam)
      useEffect(() => {
            const parsedObject = {
                  term: term,
                  onlyFriends: friend,
                  page: page,
            }
            let actualPage = currentPage
            let actualFilter = filter
            if (!!parsedObject.page) {
                  actualPage = Number(parsedObject.page)
            }
            if (!!parsedObject.term) {
                  actualFilter = { ...actualFilter, term: parsedObject.term }
            }
            switch (parsedObject.onlyFriends) {
                  case 'true':
                        actualFilter = { ...actualFilter, onlyFriends: true }
                        break
                  case 'false':
                        actualFilter = { ...actualFilter, onlyFriends: false }
                        break
                  case 'null':
                        actualFilter = { ...actualFilter, onlyFriends: null }
                        break
            }
            dispatch(getUsersThunk(actualPage, pageSize, actualFilter.term, actualFilter.onlyFriends))
      }, [])
      useEffect(() => {
            navigate(`/users?term=${filter.term}&friend=${filter.onlyFriends}&page=${currentPage}`)
      }, [filter, currentPage])
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
      const screens = useBreakpoint()
      return (
            <Row className={`${styles.users} section`}>
                  <Col span={12}>
                        <Pagination defaultCurrent={1} total={overall} current={currentPage} onChange={setCurrentPageUsers} />
                  </Col>
                  <Col span={12}>
                        <UsersSearch setFilterSearch={setFilterSearch} />
                  </Col>
                  <Col span={24} style={{ padding: '1em 0' }}>
                        <Row justify={'space-between'} gutter={[5, 5]} wrap={true}>
                              {users.map((u: UserType, id) => (
                                    <Col lg={4} sm={6} xs={24} span={6} key={id}>
                                          <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
                                                <Flex justify='center' align='center' vertical gap={'1.5em'} style={{ padding: '2em' }}>
                                                      <NavLink to={'/profile/' + u.id}>
                                                            <img src={u.photos?.small || `https://icones.pro/wp-content/uploads/2021/04/icone-sourire-violet.png`} alt='MyProfile' style={imgStyle} />
                                                      </NavLink>

                                                      <Flex vertical align='center' justify='center'>
                                                            <Typography.Title level={5}>{u.name}</Typography.Title>
                                                            {u.followed ? (
                                                                  <Button onClick={() => unfollowUser(u.id)} disabled={inProgress.some((i: number) => i === u.id)} type='primary'>
                                                                        Unfollow
                                                                  </Button>
                                                            ) : (
                                                                  <Button onClick={() => followUser(u.id)} disabled={inProgress.some((i: number) => i === u.id)} type='primary'>
                                                                        Follow
                                                                  </Button>
                                                            )}
                                                      </Flex>
                                                </Flex>
                                          </Card>
                                    </Col>
                              ))}
                        </Row>
                  </Col>
            </Row>
      )
}

export default Users
