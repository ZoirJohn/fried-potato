import { FC } from 'react'
import { Button, Layout, Menu } from 'antd'
import { IDispatch } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../selectors'
import { deleteAuthData } from '../../redux/auth-reducer'
import styles from '../../css/Header.module.css'
import imgLogo from '../../img/logo.png'
import type { MenuProps } from 'antd'

const { Header } = Layout

const items1: MenuProps['items'] = ['1'].map((key) => ({
      key,
      label: 'Feed',
}))

const HeaderComponent: FC = () => {
      const auth = useSelector(getAuth)
      const dispatch: IDispatch = useDispatch()
      const removeAuthData = () => {
            dispatch(deleteAuthData())
      }
      return (
            <Header style={{ display: 'flex', alignItems: 'center', gap: '1em' }} className={styles.header}>
                  <img src={imgLogo} alt='logotype' className={`${styles.logo} demo-logo`} />
                  <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} items={items1} style={{ flex: 1, minWidth: 0 }} />
                  {auth ? <Button onClick={() => removeAuthData()}>Log out</Button> : <Button href='#'>Log in</Button>}
            </Header>
      )
}

export default HeaderComponent
