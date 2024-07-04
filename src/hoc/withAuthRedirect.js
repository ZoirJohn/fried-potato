import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToPropsWithAuth = (state) => {
	return {
		auth: state.auth.isAuthorized,
	};
};

export const withAuthRedirect = (Component) => {

	const ComponentWithRedirect = (props) => {
		if (!props.auth) {
			return <Navigate to={'/login'}/>;
		}
		return <Component {...props}/>;
	};

	return connect(mapStateToPropsWithAuth)(ComponentWithRedirect);
};