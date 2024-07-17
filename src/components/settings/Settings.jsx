import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { savePhoto } from '../../redux/profile-reducer';

const Settings = (props) => {
	const uploadPhoto = (e) => {
		props.savePhoto(e.target.files[0]);
	};

	return (<ul>
		{props.ownId === props.uploadedId ?
			<>
				<li><input onChange={uploadPhoto} type="file" placeholder='Change profile photo' /></li>
				<li><button>Change profile</button></li>
			</> : 'Switch to your account (Go to profile and come back)'}
	</ul>);

};

const mapStateToProps = (state) => {
	return {
		ownId: state.auth.id,
		uploadedId: state.profile.profileUser?.userId
	};
};

export default compose(connect(mapStateToProps, { savePhoto }), withAuthRedirect)(Settings);