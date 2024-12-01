import React, { useEffect, useState } from 'react'
import Loader from './assets/Loader'
import HeaderComponent from './components/header/HeaderComponent'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { withRouter } from './hoc/withRouter'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import { rootStateType } from './redux/store'
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons'
import { Button, Layout,  theme } from 'antd'
import ProfileContainer from './components/profile/ProfileContainer'

const { Header, Sider, Content } = Layout

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
                  <Layout style={{ height: '100%' }}>
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
                                    <ProfileContainer />
                              </Content>
                        </Layout>
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                              <div className='demo-logo-vertical' />
                              <Sidebar />
                        </Sider>
                  </Layout>
                  <div data-testid='container' className='container'>
                        {/* <Main />
                        <Sidebar /> */}
                  </div>
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
