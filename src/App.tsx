import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { withRouter } from './hoc/withRouter'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import { rootStateType } from './redux/store'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import HeaderComponent from './components/header/HeaderComponent'
import ProfileContainer from './components/profile/ProfileContainer'
import Login from './components/login/Login'
import Loader from './assets/Loader'
import Sidebar from './components/Sidebar'

const { Header, Content } = Layout

const Dialogs = lazy(() => import('./components/dialogs/DialogsContainer'))
const News = lazy(() => import('./components/news/News'))
const Music = lazy(() => import('./components/music/Music'))
const Settings = lazy(() => import('./components/settings/Settings'))
const Users = lazy(() => import('./components/users/UsersContainer'))

const App = (props: any) => {
      const [collapsed, setCollapsed] = useState(false)
      const {
            token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken()
      useEffect(() => {
            props.initializeApp()
      }, [])

      if (!props.initialized) {
            return <Loader isFetching={props.initialized} />
      }
      return (
            <div data-testid='app' className='App'>
                  <HeaderComponent />
                  <Layout>
                        <Layout>
                              <Header style={{ padding: 0, background: colorBgContainer }}>
                                    <Button
                                          type='text'
                                          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                          onClick={() => setCollapsed(!collapsed)}
                                          style={{
                                                fontSize: '16px',
                                                width: 64,
                                                height: 64,
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
                  {/* <div data-testid='container' className='container'>
                        {/* <Main />
                        <Sidebar /> */}
                  {/* </div> */}
            </div>
      )
}

const mapStateToProps = (state: rootStateType) => {
      return {
            initialized: state.app.initialized,
      }
}

const Wrapper = compose<React.ComponentType>(
      withRouter,
      connect(mapStateToProps, {
            initializeApp,
      })
)(App)

export default Wrapper
