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
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'

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
                  {/* <HeaderComponent /> */}
                  <Layout>
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                              <div className='demo-logo-vertical' />
                              <Menu
                                    theme='dark'
                                    mode='inline'
                                    defaultSelectedKeys={['1']}
                                    items={[
                                          {
                                                key: '1',
                                                icon: <UserOutlined />,
                                                label: 'nav 1',
                                          },
                                          {
                                                key: '2',
                                                icon: <VideoCameraOutlined />,
                                                label: 'nav 2',
                                          },
                                          {
                                                key: '3',
                                                icon: <UploadOutlined />,
                                                label: 'nav 3',
                                          },
                                    ]}
                              />
                        </Sider>
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
                                          margin: '24px 16px',
                                          padding: 24,
                                          minHeight: 280,
                                          background: colorBgContainer,
                                          borderRadius: borderRadiusLG,
                                    }}
                              >
                                    Content
                              </Content>
                        </Layout>
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
