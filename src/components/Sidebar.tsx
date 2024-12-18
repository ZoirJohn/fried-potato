import { Link } from 'react-router-dom'
import { UnorderedListOutlined, UserOutlined, MessageOutlined, MutedOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import { useLocation } from 'react-router-dom'
import styles from '../css/Sidebar.module.css'

type PropsType = {
      collapsed: boolean
}
const { Sider } = Layout
const Sidebar: React.FC<PropsType> = ({ collapsed }) => {
      const location = useLocation()
      const selectedKey = location.pathname
      return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                  <Menu
                        className={styles.sidebar}
                        theme='dark'
                        mode='inline'
                        selectedKeys={selectedKey === '/login' ? [] : !Number.isNaN(Number(selectedKey[selectedKey.length - 1])) ? ['/profile'] : [selectedKey]}
                        items={[
                              {
                                    key: '/profile',
                                    icon: <UserOutlined />,
                                    label: <Link to='/profile'>Profile</Link>,
                                    className: styles.sidebarItem,
                              },
                              {
                                    key: '/dialogs',
                                    icon: <MessageOutlined />,
                                    label: <Link to='/dialogs'>Messages</Link>,
                                    className: styles.sidebarItem,
                              },
                              {
                                    key: '/news',
                                    icon: <UnorderedListOutlined />,
                                    label: <Link to='/news'>News</Link>,
                                    className: styles.sidebarItem,
                              },
                              {
                                    key: '/music',
                                    icon: <MutedOutlined />,
                                    label: <Link to='/music'>Music</Link>,
                                    className: styles.sidebarItem,
                              },
                              {
                                    key: '/settings',
                                    icon: <SettingOutlined />,
                                    label: <Link to='/settings'>Settings</Link>,
                                    className: styles.sidebarItem,
                              },
                              {
                                    key: '/users',
                                    icon: <UsergroupAddOutlined />,
                                    label: <Link to='/users'>Users</Link>,
                                    className: styles.sidebarItem,
                              },
                        ]}
                  />
            </Sider>
      )
}

export default Sidebar
