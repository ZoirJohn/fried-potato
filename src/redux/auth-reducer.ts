import { stopSubmit } from "redux-form";
import { authAPI, loginAPI } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const DELETE_USER_DATA = "auth/DELETE-USER-DATA";
const SET_CAPTCHA = "auth/SET-CAPTCHA";

let initialState = {
      id: null as number | null,
      login: null as string | null,
      email: null as string | null,
      password: null as string | null,
      isAuthorized: null as boolean | null,
      captcha: null as string | null,
};

export type initialStateAuthType = typeof initialState;

const auth_reducer = (_state = initialState, action: any) => {
      switch (action.type) {
            case SET_USER_DATA:
                  return {
                        ..._state,
                        id: action.id,
                        login: action.login,
                        email: action.email,
                        isAuthorized: action.isAuthorized,
                  };
            case DELETE_USER_DATA:
                  return {
                        ..._state,
                        id: null,
                        login: null,
                        email: null,
                        isAuthorized: false,
                  };
            case SET_CAPTCHA:
                  return {
                        ..._state,
                        captcha: action.url,
                  };
            default:
                  return { ..._state };
      }
};

type setUserDataDoneType = {
      type: typeof SET_USER_DATA;
      id: number | null;
      login: string | null;
      email: string | null;
      isAuthorized: boolean;
};
const setUserDataDone = (id: number | null, login: string | null, email: string | null, isAuthorized: boolean): setUserDataDoneType => ({
      type: SET_USER_DATA,
      id,
      login,
      email,
      isAuthorized,
});

type setCaptchaDoneType = { type: typeof SET_CAPTCHA; url: string };
const setCaptchaDone = (url: string): setCaptchaDoneType => ({ type: SET_CAPTCHA, url });

const setCaptcha = () => (dispatch: Function) => {
      loginAPI.CAPTCHA().then((response) => {
            dispatch(setCaptchaDone(response.url));
      });
};
const setUserData = () => (dispatch: Function) => {
      authAPI.IS_REGISTERED().then((data) => {
            if (data.resultCode === 0) {
                  const { id, login, email } = data.data;
                  dispatch(setUserDataDone(id, login, email, true));
            }
      });
};
const sendAuthData = (email: string, password: string, captcha: string) => (dispatch: Function) => {
      loginAPI.LOGIN(email, password, captcha).then((response) => {
            if (response.resultCode === 0) {
                  dispatch(setUserData());
            } else {
                  const message = response.messages[0];
                  if (response.resultCode === 10) {
                        dispatch(setCaptcha());
                  }
                  dispatch(stopSubmit("login", { _error: message }));
            }
      });
};
const deleteAuthData = (email: string, password: string) => (dispatch: Function) => {
      loginAPI.LOGOUT(email, password).then((response) => {
            if (response.resultCode === 0) {
                  dispatch(setUserDataDone(null, null, null, false));
            }
      });
};

export { auth_reducer, setUserData, sendAuthData, deleteAuthData };
