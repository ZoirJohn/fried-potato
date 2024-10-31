import styles from '../../css/Header.module.css'
import imgLogo from '../../img/logo.png'

type IProps = {
      auth: boolean
      deleteAuthData: () => void
}

const Header = (props: any) => {
      return (
            <header className={styles.header}>
                  <div className={`${styles.container} container`}>
                        <img src={imgLogo} alt='logotype' className={styles.logo} />
                        {props.auth ? <a onClick={() => props.deleteAuthData()}>Log out</a> : <a href='#'>Log in</a>}
                  </div>
            </header>
      )
}

export default Header
