import { Link } from 'react-router-dom'
import { UnorderedListOutlined, UserOutlined, MessageOutlined, MutedOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import { useLocation } from 'react-router-dom'

type PropsType = {
      collapsed: boolean
}
const { Sider } = Layout
const Sidebar: React.FC<PropsType> = ({ collapsed }) => {
      const location = useLocation()
      const selectedKey = location.pathname
      return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                  <div className='demo-logo-vertical' />
                  <Menu
                        theme='dark'
                        mode='inline'
                        selectedKeys={selectedKey === '/login' ? [] : !Number.isNaN(Number(selectedKey[selectedKey.length - 1])) ? ['/profile'] : [selectedKey]}
                        items={[
                              {
                                    key: '/profile',
                                    icon: <UserOutlined />,
                                    label: <Link to='/profile'>Profile</Link>,
                              },
                              {
                                    key: '/dialogs',
                                    icon: <MessageOutlined />,
                                    label: <Link to='/dialogs'>Messages</Link>,
                              },
                              {
                                    key: '/news',
                                    icon: <UnorderedListOutlined />,
                                    label: <Link to='/news'>News</Link>,
                              },
                              {
                                    key: '/music',
                                    icon: <MutedOutlined />,
                                    label: <Link to='/music'>Music</Link>,
                              },
                              {
                                    key: '/settings',
                                    icon: <SettingOutlined />,
                                    label: <Link to='/settings'>Settings</Link>,
                              },
                              {
                                    key: '/users',
                                    icon: <UsergroupAddOutlined />,
                                    label: <Link to='/users'>Users</Link>,
                              },
                        ]}
                  />
            </Sider>
      )
}

export default Sidebar
