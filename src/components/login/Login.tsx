import styles from "../../css/Login.module.css"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { sendAuthData } from "../../redux/auth-reducer"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { rootStateType } from "../../redux/store"
import React from "react"

type OwnPropsType = {
      captcha: string
}

// ? Component
const Login: React.FC<InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType> = (props) => {
      return (
            <div>
                  <h1>Login</h1>
                  <form onSubmit={props.handleSubmit} className={styles.form} action='#'>
                        <Field component='input' name='login' type='text' placeholder='Login' />
                        <Field component='input' name='password' type='password' placeholder='Password' />
                        <Field component='input' type='checkbox' name='remember' />
                        <button>Login</button>
                        {props.captcha && (
                              <>
                                    <img src={props.captcha} alt='captchaImg' />
                                    <Field component='input' name='captcha' type='text' placeholder='Enter captcha symbols' />
                              </>
                        )}
                        {props.error && <p className={styles.error}>{props.error}</p>}
                        <a className={styles.noAccount} href='https://social-network.samuraijs.com/' target='_blank'>
                              Don't have an account? Please register
                        </a>
                  </form>
            </div>
      )
}

// ? Redux Form HOC
const LoginForm = reduxForm<FormDataType, OwnPropsType>({
      form: "login",
})(Login)

// ? Container Stuff
type MapStateToProps = {
      auth: boolean
      captcha: string
}
type MapDispatchToProps = {
      sendAuthData: (login: string, password: string, captcha: string) => void
}
type FormDataType = {
      login: string
      password: string
      captcha: string
}
const LoginContainer: React.FC<MapStateToProps & MapDispatchToProps> = (props) => {
      if (props.auth) {
            return <Navigate to={"/profile"} />
      }
      return (
            <LoginForm
                  {...props}
                  onSubmit={(formData: FormDataType) => {
                        props.sendAuthData(formData.login, formData.password, formData.captcha)
                  }}
            />
      )
}

const mapStateToProps = (state: rootStateType): MapStateToProps => {
      return {
            auth: state.auth.isAuthorized,
            captcha: state.auth.captcha,
      }
}

export default connect(mapStateToProps, { sendAuthData })(LoginContainer)
