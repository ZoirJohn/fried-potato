import styles from '../../css/PostModel.module.css';
import {AiOutlineLike} from 'react-icons/ai';
import profilePhoto from '../../img/profile.jpg';

const PostModel = (props) => {
	return (
		<li className={styles.item}>
			<img src={profilePhoto} alt=""/>
			<p>{props.text}</p>
			<div className={styles.buttons}>
				<p><AiOutlineLike/><span>{props.likeNumber}</span></p>
			</div>
		</li>
	);
};

export default PostModel;