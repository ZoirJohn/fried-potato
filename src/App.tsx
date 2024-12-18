import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { IDispatch } from './redux/store'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import { getInitialized } from './selectors'
import { FC } from 'react'
import HeaderComponent from './components/header/HeaderComponent'
import ProfileContainer from './components/profile/ProfileContainer'
import Login from './components/login/Login'
import Loader from './assets/Loader'
import Sidebar from './components/Sidebar'
import styles from './css/Main.module.css'
const { Header, Content } = Layout

const Dialogs = lazy(() => import('./components/dialogs/DialogsContainer'))
const News = lazy(() => import('./components/news/News'))
const Music = lazy(() => import('./components/music/Music'))
const Settings = lazy(() => import('./components/settings/Settings'))
const Users = lazy(() => import('./components/users/UsersContainer'))

const App: FC = (props) => {
      const [collapsed, setCollapsed] = useState(true)
      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken()
      useEffect(() => {
            initialization()
      }, [])
      const initialized = useSelector(getInitialized)
      const dispatch: IDispatch = useDispatch()
      const initialization = () => {
            dispatch(initializeApp())
      }
      if (!initialized) {
            return <Loader isFetching={initialized} />
      }
      return (
            <>
                  <HeaderComponent />
                  <Layout style={{ flexGrow: 1 }}>
                        <Layout>
                              <Header style={{ padding: 0, background: colorBgContainer, zIndex: 3 }}>
                                    <Button
                                          type='text'
                                          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                          onClick={() => setCollapsed(!collapsed)}
                                          style={{
                                                fontSize: '16px',
                                                width: 64,
                                                height: 64,
                                                margin: 0,
                                          }}
                                    />
                              </Header>
                              <Content
                                    style={{
                                          margin: '12px 16px',
                                          padding: 0,
                                          minHeight: 280,
                                          background: colorBgContainer,
                                          borderRadius: borderRadiusLG,
                                    }}
                                    className={styles.mainComp}
                              >
                                    <Suspense fallback={<p>Loading...</p>}>
                                          <Routes>
                                                <Route index path={'*'} element={<Navigate to='/profile' replace />} />
                                                <Route path={'/profile/:userId?'} element={<ProfileContainer />} />
                                                <Route path='/dialogs' element={<Dialogs />} />
                                                <Route path='/news' element={<News />} />
                                                <Route path='/music' element={<Music />} />
                                                <Route path='/settings' element={<Settings />} />
                                                <Route path='/users' element={<Users />} />
                                                <Route path='/login' element={<Login />} />
                                          </Routes>
                                    </Suspense>
                              </Content>
                        </Layout>
                        <Sidebar collapsed={collapsed} />
                  </Layout>
            </>
      )
}

export default App
