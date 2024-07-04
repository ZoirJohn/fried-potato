import styles from '../../css/Login.module.css';
import {Field, reduxForm} from 'redux-form';
import {sendAuthData} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';

const Login = (props) => {
	return <div>
		<h1 >Login</h1>
		<form onSubmit={props.handleSubmit} className={styles.form} action="#">
			<Field component="input" name="login" type="text" placeholder="Login"/>
			<Field component="input" name="password" type="password" placeholder="Password"/>
			<Field component="input" type="checkbox" name="remember"/>
			<button>Submit</button>
		</form>
	</div>;
};

const LoginForm = reduxForm({
	form: 'login',
})(Login);

const LoginContainer = (props) => {
	if (props.auth) {
		return <Navigate to={'/profile'}/>;
	}
	return <LoginForm onSubmit={(formData) => props.sendAuthData(formData.login, formData.password)}/>;
};

const mapStateToProps = (state) => {
	return {
		id: state.auth.id,
		auth: state.auth.isAuthorized,
	};
};

export default connect(mapStateToProps, {sendAuthData})(LoginContainer);