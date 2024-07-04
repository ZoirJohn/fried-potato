import styles from '../../css/Users.module.css';
import {NavLink} from 'react-router-dom';
import Paginator from '../../assets/Paginator';

const Users = (props) => {
	return <section className={styles.users}>
		<Paginator overall={props.overall} pageSize={props.pageSize} currentPage={props.currentPage}
				   setCurrentPageUsers={props.setCurrentPageUsers} portionSize={3}/>
		<ul className={styles.usersBox}>
			{props.usersList.map(u => <li className={styles.user} key={u.id}>
				<NavLink to={'/profile/' + u.id}>
					<img
						src="https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg"
						alt="MyProfile"/>
				</NavLink>
				<p>
					{u.name}
				</p>
				{u.followed ?
					<button
						onClick={() => props.unfollow(u.id)}
						disabled={props.inProgress.some(i => i === u.id)}>Unfollow</button> :
					<button onClick={() => props.follow(u.id)}
							disabled={props.inProgress.some(i => i === u.id)}>Follow</button>
				}
			</li>)}

		</ul>
	</section>;

};

export default Users;