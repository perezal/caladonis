import { authService } from '../services/auth.service';
import { push } from 'react-router-redux';
import { actionTypes } from '../constants/auth.actions';

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  user
});

const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE,
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
  type: actionTypes.LOGOUT_SUCCESS
});

function logout() {
  return dispatch => {
    authService.logout();
    dispatch(logoutSuccess());
    dispatch(push('/login'));
  }
}

const signupRequest = () => ({
  type: actionTypes.SIGNUP_REQUEST
})

const signupSuccess = () => ({
  type: actionTypes.SIGNUP_SUCCESS,
})

const signupFailure = (errors) => ({
  type: actionTypes.SIGNUP_FAILURE,
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
  signupFailure,
}
