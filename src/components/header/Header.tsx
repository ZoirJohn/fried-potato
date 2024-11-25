import { useDispatch, useSelector } from 'react-redux'
import styles from '../../css/Header.module.css'
import imgLogo from '../../img/logo.png'
import { getAuth } from '../../selectors'
import { deleteAuthData } from '../../redux/auth-reducer'
import { IDispatch } from '../../redux/store'
import { FC } from 'react'

type IProps = {}

const Header: FC<IProps> = (props) => {
      const auth = useSelector(getAuth)
      const dispatch: IDispatch = useDispatch()
      const removeAuthData = () => {
            dispatch(deleteAuthData())
      }
      return (
            <header className={styles.header}>
                  <div className={`${styles.container} container`}>
                        <img src={imgLogo} alt='logotype' className={styles.logo} />
                        {auth ? <a onClick={() => removeAuthData()}>Log out</a> : <a href='#'>Log in</a>}
                  </div>
            </header>
      )
}

export default Header
