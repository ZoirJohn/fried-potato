import styles from '../../css/Login.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { sendAuthData } from '../../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { IDispatch, rootStateType } from '../../redux/store'
import React, { FC } from 'react'
import { getAuth, getCaptcha } from '../../selectors'
import { Button } from 'antd'

type FormDataType = {
      login: string
      password: string
      captcha: string
      apiKey: string
}
export const API_KEY = prompt('Please provided API-KEY from social-network.samuraijs.com if you want to follow or unfollow users but if you do not want you can click on CANCEL')

// ? Component
const Login: React.FC<InjectedFormProps<FormDataType>> = (props) => {
      const captcha = useSelector((state: rootStateType) => state.auth.captcha)

      return (
            <div className={`${styles.loginForm} section`}>
                  <h1>Login</h1>
                  <form onSubmit={props.handleSubmit} className={styles.form} action='#'>
                        <Field component='input' name='login' type='text' placeholder='Login' />
                        <Field component='input' name='password' type='password' placeholder='Password' />
                        {/* <Field component='input' name='apiKey' type='text' placeholder='API-KEY' /> */}
                        <Field component='input' type='checkbox' name='remember' />
                        <Button type='primary' htmlType='submit'>
                              Login
                        </Button>
                        {captcha && (
                              <>
                                    <img src={captcha} alt='captchaImg' />
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
const LoginForm = reduxForm<FormDataType>({
      form: 'login',
})(Login)

// ? Container Stuff
const LoginContainer: FC = (props) => {
      const auth = useSelector(getAuth)
      const dispatch: IDispatch = useDispatch()
      const addAuthData = (login: string, password: string, captcha: string, apiKey: string) => {
            dispatch(sendAuthData(login, password, captcha, apiKey))
      }
      if (auth) {
            return <Navigate to={'/profile'} />
      }
      return (
            <LoginForm
                  onSubmit={(formData: FormDataType) => {
                        addAuthData(formData.login, formData.password, formData.captcha, formData.apiKey)
                  }}
            />
      )
}

export default LoginContainer
