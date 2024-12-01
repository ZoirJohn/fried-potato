import styles from '../css/Sidebar.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UnorderedListOutlined, UserOutlined, MessageOutlined, MutedOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Menu, Layout } from 'antd'

type PropsType = {
      collapsed: boolean
}
const { Sider } = Layout
const Sidebar: React.FC<PropsType> = ({ collapsed }) => {
      return (
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
                                    label: (
                                          <NavLink to='/profile' className={({ isActive }) => (isActive ? styles.active : '')}>
                                                Profile
                                          </NavLink>
                                    ),
                              },
                              {
                                    key: '2',
                                    icon: <MessageOutlined />,
                                    label: (
                                          <NavLink to='/dialogs' className={({ isActive }) => (isActive ? styles.active : '')}>
                                                Messages
                                          </NavLink>
                                    ),
                              },
                              {
                                    key: '3',
                                    icon: <UnorderedListOutlined />,
                                    label: (
                                          <NavLink to='/news' className={({ isActive }) => (isActive ? styles.active : '')}>
                                                News
                                          </NavLink>
                                    ),
                              },
                              {
                                    key: '4',
                                    icon: <MutedOutlined />,
                                    label: (
                                          <NavLink to='/music' className={({ isActive }) => (isActive ? styles.active : '')}>
                                                Music
                                          </NavLink>
                                    ),
                              },
                              {
                                    key: '5',
                                    icon: <SettingOutlined />,
                                    label: (
                                          <NavLink to='/settings' className={({ isActive }) => (isActive ? styles.active : '')}>
                                                Settings
                                          </NavLink>
                                    ),
                              },
                              {
                                    key: '6',
                                    icon: <UsergroupAddOutlined />,
                                    label: (
                                          <NavLink to='/users' className={({ isActive }) => (isActive ? styles.active : '')}>
                                                Users
                                          </NavLink>
                                    ),
                              },
                        ]}
                  />
            </Sider>

            //       <span className={classNames(styles.arrow, { [styles.active]: btn })} onClick={() => sidebarSwitch(!btn)}></span>
      )
}

export default Sidebar
