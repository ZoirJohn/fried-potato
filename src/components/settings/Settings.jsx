import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { savePhoto } from '../../redux/profile-reducer';
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
		return (
			<ul className={styles.settingsBox}>
				<p className={`${styles.warning} ${this.state.warning && styles.warn} ${this.state.hideWarning && styles.hideWarn}`}><span onClick={this.setHideWarning}>X</span>Picture has been replaced!</p>
				{
					this.props.ownId === this.props.uploadedId ?
						<>
							<li><input onChange={uploadPhoto} type="file" placeholder='Change profile photo' /></li>
							{/* <li><button onClick={this.showForm}>Change profile</button></li> */}
							<li>
								<SetProfileRedux onSubmit={(formData) => console.log(formData)} />
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
			Looking for a job: {createField('lookingForAJob')}
		</label>
		<label className={styles.fieldLabel}>
			Looking for a job description: {createField('lookingForAJobDescription')}
		</label>
		<label className={styles.fieldLabel}>
			Full name: {createField('fullName')}
		</label>
		<label className={styles.fieldLabel}>
			Contacts: {createField('contacts')}
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

export default compose(connect(mapStateToProps, { savePhoto }), withAuthRedirect)(Settings);