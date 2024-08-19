import { CgMusicNote, CgNotes, CgProfile, CgServerless } from 'react-icons/cg';
import { FaRegMessage } from 'react-icons/fa6';

import styles from '../css/Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import classNames from 'classnames';
import { useState } from 'react';

const Sidebar = (props) => {
	let [btn, sidebarSwitch] = useState(true);
	return (
		<aside className={styles.aside}>
			<ul>
				<li>
					<NavLink to="/profile"
						className={({ isActive }) => isActive ? styles.active : ''}><CgProfile />Profile</NavLink>

				</li>
				<li>
					<NavLink to="/dialogs" className={({ isActive }) => isActive ? styles.active : ''}><FaRegMessage />Messages</NavLink>
				</li>
				<li>
					<NavLink to="/news"
						className={({ isActive }) => isActive ? styles.active : ''}><CgNotes />News</NavLink>
				</li>
				<li>
					<NavLink to="/music"
						className={({ isActive }) => isActive ? styles.active : ''}><CgMusicNote />Music</NavLink>
				</li>
				<li>
					<NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : ''}><CgServerless />Settings</NavLink>
				</li>
				<li>
					<NavLink to="/users"
						className={({ isActive }) => isActive ? styles.active : ''}><FaUsers />Users</NavLink>
				</li>
			</ul>
			<span className={classNames(styles.arrow, { [styles.visible]: btn })} onClick={() => sidebarSwitch(false)}></span>
		</aside>
	);
};

export default Sidebar;