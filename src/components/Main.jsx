import {Route, Routes} from 'react-router-dom';

import styles from '../css/Main.module.css';
import ProfileContainer from './profile/ProfileContainer';
import DialogsContainer from './dialogs/DialogsContainer';
import UsersContainer from './users/UsersContainer';
import Login from './login/Login';
import News from './news/News';
import Music from './music/Music';
import Settings from './settings/Settings';

const Main = (props) => {
	return (<main className={styles.main}>
		<Routes>
			<Route path={'/'}
				   element={<ProfileContainer/>}/>
			<Route path={'/profile/:userId?'}
				   element={<ProfileContainer/>}/>

			<Route path="/dialogs"
				   element={<DialogsContainer/>}/>
			<Route path="/news"
				   element={<News/>}/>
			<Route path="/music"
				   element={<Music/>}/>
			<Route path="/settings"
				   element={<Settings/>}/>
			<Route path="/users"
				   element={<UsersContainer/>}/>

			{/*No render is here*/}
			<Route path="/login"
				   element={<Login/>}/>


		</Routes>


	</main>);
};
export default Main;