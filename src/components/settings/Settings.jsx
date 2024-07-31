import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { savePhoto, saveProfile } from '../../redux/profile-reducer';
import { Component } from 'react';
import styles from '../../css/Settings.module.css';
import createField from '../../assets/createField';
import { reduxForm } from 'redux-form';


class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			warning: false,
			hideWarning: false,
			form: false,
		};
		this.setWarning = this.setWarning.bind(this);
		this.setHideWarning = this.setHideWarning.bind(this);
	}
	setWarning = () => {
		this.setState((prevState) => ({ warning: !prevState.warning }));
	};
	setHideWarning = () => {
		this.setState((prevState) => ({ hideWarning: !prevState.hideWarning }));
	};
	componentDidUpdate(prevProps, prevState) {
		if (!this.state.warning) {
			this.setWarning();
		}
	};
	render() {
		const uploadPhoto = (e) => {
			this.props.savePhoto(e.target.files[0]);
		};
		const formDataSubmit = (formData) => {
			this.props.saveProfile(formData);
		};
		return (
			<ul className={styles.settingsBox}>
				<p className={`${styles.warning} ${this.state.warning && styles.warn} ${this.state.hideWarning && styles.hideWarn}`}><span onClick={this.setHideWarning}>X</span>Picture has been replaced!</p>
				{
					this.props.ownId === this.props.uploadedId ?
						<>
							<li><input onChange={uploadPhoto} type="file" placeholder='Change profile photo' /></li>
							<li>
								<SetProfileRedux onSubmit={formDataSubmit} />
							</li>
						</> : 'Switch to your account (Go to profile and come back)'
				}
			</ul >
		);
	}
}

const ProfileReset = (props) => {
	return <form onSubmit={props.handleSubmit} className={styles.fieldForm}>
		<h3>Profile Settings</h3>
		<label className={styles.fieldLabel}>
			{createField('lookingForAJob', 'Looking for a job', false)}
		</label>
		<label className={styles.fieldLabel}>
			{createField('lookingForAJobDescription', 'Description', true)}
		</label>
		<label className={styles.fieldLabel}>
			{createField('fullName', 'Full name', true)}
		</label>
		<label className={styles.fieldLabel}>
			{createField('aboutMe', 'About me', true)}
		</label>
		<label className={styles.fieldLabel}>
			{createField('github', 'GitHub', true)}
		</label>
		<label className={styles.fieldLabel}>
			{createField('instagram', 'Instagram', true)}
		</label>
		<label className={styles.fieldLabel}>
			{createField('twitter', 'Twitter', true)}
		</label>
		<button type='submit'>Submit</button>
	</form>;
};

const SetProfileRedux = reduxForm({ form: 'profile_data' })(ProfileReset);

const mapStateToProps = (state) => {
	return {
		ownId: state.auth.id,
		uploadedId: state.profile.profileUser?.userId,
		payload: state.profile.profileUser?.photos,
	};
};

export default compose(connect(mapStateToProps, { savePhoto, saveProfile }), withAuthRedirect)(Settings);