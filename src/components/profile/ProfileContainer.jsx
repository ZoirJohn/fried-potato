import { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import Loader from '../../assets/Loader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { addPost, setProfile, setStatus, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from '../../hoc/withRouter';

class ProfileContainer extends Component {
	refreshProfile() {
		let id = this.props.router.params.userId;
		if (!id) id = this.props.id;
		this.props.setProfile(id);
		this.props.setStatus(id);
	}
	componentDidMount() {
		this.refreshProfile();
	}
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps.status === this.props.status;
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.router.params.userId != prevProps.router.params.userId) {
			this.refreshProfile();
		}
	}
	render() {
		if (!this.props.profileUser) {
			return <Loader isFetching={true} />;
		}

		return <Profile {...this.props} />;
	}
}
const mapStateToProps = (state) => {
	return {
		posts: state.profile.posts,
		newPost: state.profile.newPost,
		profileUser: state.profile.profileUser,
		status: state.profile.status,
		id: state.auth.id,
		photos: state.profile.profileUser?.photos
	};
};

export default compose(connect(mapStateToProps, { addPost, setProfile, setStatus, updateStatus, }), withRouter, withAuthRedirect)(ProfileContainer);