import PostModel from './PostModel';
import background from '../../img/background.jpeg';
import profileUser from '../../img/profile-user.webp';
import React, { useState } from 'react';
import styles from '../../css/Profile.module.css';
import AddPostRedux from './ProfileForm';


const Profile = (props) => {
	let [edit, setStatus] = useState(false);
	let [currentWord, setCurrentWord] = useState('');
	let [word, setWord] = useState(props.status);
	const handleStatus = () => {
		setStatus(edit => !edit);
		if (edit) {
			props.updateStatus(currentWord);
		}
	};
	const handleClick = (e) => {
		setCurrentWord(currentWord = e.target.value);
	};
	const handleWord = () => {
		setWord(word = currentWord);
	};
	return (<section className={styles.profile}>
		<img src={background} alt="background" />
		<div className={styles.dataBox}>
			<img src={props.profileUser?.photos.large || profileUser} alt="background" />
			<div className={styles.info}>
				<p><span>Full name:</span> {props.profileUser?.fullName || 'Carnage'}</p>
				<div className={styles.statusBox}><span>Status: </span>
					{!edit && <pre className={styles['status-word']} onDoubleClick={handleStatus}>{word}</pre>}
					<pre onDoubleClick={handleStatus}>
						{edit && <input value={word} onChange={(e) => {
							handleClick(e);
							handleWord(e);
						}} type="text" />}
					</pre>
				</div>
				<p><span>Education:</span> Embry-Riddle</p>
			</div>
		</div>
		<div className={styles.messages}>
			<AddPostRedux onSubmit={(formData) => {
				props.addPost(formData.AddPostForm);
			}} />
			<ul className={styles.messagesBox}>
				{props.posts.map((p, id) => <PostModel text={p.text} profilePhoto={props.profilePhoto}
					likeNumber={p.likeNumber} key={id} />)}
			</ul>
		</div>
	</section>);
};

export default Profile;