import {Component} from 'react';
import {connect} from 'react-redux';
import {deleteAuthData, setUserData} from '../../redux/auth-reducer';
import Header from './Header';

class HeaderComponent extends Component {
	render() {
		return <Header {...this.props}/>;
	}
};

const mapStateToProps = (state) => {
		return {
			auth: state.auth,
		};
	}
;

export default connect(mapStateToProps, {deleteAuthData})(HeaderComponent);