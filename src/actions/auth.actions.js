import { authService } from '../services/auth.service';
import { push } from 'react-router-redux';

export const authActions = {
  login,
  logout,
}

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