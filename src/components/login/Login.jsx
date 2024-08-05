import styles from '../../css/Login.module.css';
import { Field, reduxForm } from 'redux-form';
import { sendAuthData } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
	return <div>
		<h1 >Login</h1>
		<form onSubmit={props.handleSubmit} className={styles.form} action="#">
			<Field component="input" name="login" type="text" placeholder="Login" />
			<Field component="input" name="password" type="password" placeholder="Password" />
			<Field component="input" type="checkbox" name="remember" />
			{false && false}
			<button>Login</button>
			{props.captcha &&
				<>
					<img src={props.captcha} alt="captchaImg" />
					<Field component='input' name='captcha' type='text' placeholder='Enter captcha symbols' />
				</>
			}
			{props.error && <p className={styles.error}>{props.error}</p>}
			<a className={styles.noAccount} href="https://social-network.samuraijs.com/" target='_blank'>Don't have an account? Please register</a>
		</form>
	</div>;
};

const LoginForm = reduxForm({
	form: 'login',
})(Login);

const LoginContainer = (props) => {
	if (props.auth) {
		return <Navigate to={'/profile'} />;
	}
	return <LoginForm {...props} onSubmit={(formData) => props.sendAuthData(formData.login, formData.password, formData.captcha)} />;
};

const mapStateToProps = (state) => {
	return {
		id: state.auth.id,
		auth: state.auth.isAuthorized,
		captcha: state.auth.captcha
	};
};

export default connect(mapStateToProps, { sendAuthData })(LoginContainer);