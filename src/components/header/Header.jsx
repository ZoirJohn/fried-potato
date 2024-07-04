import styles from '../../css/Header.module.css';
import imgLogo from '../../img/logo.png';

const Header = (props) => {
	return (<header className={styles.header}>
		<div className={`${styles.container} container`}>
			<img src={imgLogo} alt="logotype" className={styles.logo}/>
			{props.auth.isAuthorized ? <a onClick={()=>props.deleteAuthData('zokirjonovzoirbek20.05@gmail.com', 'kebrioz07')}>Log out</a> : <a href="#">Log in</a>}
		</div>
	</header>);
};

export default Header;