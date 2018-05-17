import { authService } from '../services/auth.service';
import { push } from 'react-router-redux';

const loginRequest = () => ({
  type: "LOGIN_REQUEST"
});

const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  user
});

const loginFailure = () => ({
  type: "LOGIN_FAILURE"
});

function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    authService.login(username, password)
      .then(
        user => {
          dispatch(loginSuccess(user));
          dispatch(push('/'));
        },
        error => {
          dispatch(loginFailure());
        }
      );
  }
}

const logoutSuccess = () => ({
  type: "LOGOUT"
});

function logout() {
  return dispatch => {
    authService.logout();
    dispatch(logoutSuccess());
    dispatch(push('/login'));
  }
}

const signupRequest = () => ({
  type: "SIGNUP_REQUEST"
})

const signupSuccess = () => ({
  type: "SIGNUP_SUCCESS",
})

const signupFailure = (errors) => ({
  type: "SIGNUP_FAILURE",
  errors: errors
})

function signup(userData) {
  return dispatch => {
    dispatch(signupRequest());
    authService.signup(userData)
      .then(user => {
          dispatch(login(userData.username, userData.password))
          dispatch(signupSuccess())
        },
        errors => {
          dispatch(signupFailure(errors))
        }
      )
  }
}

export const authActions = {
  login,
  logout,
  signup,
  signupFailure
}