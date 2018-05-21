import { actionTypes } from '../constants/auth.actions';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state=initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        loginFailed: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {};
    case actionTypes.SIGNUP_REQUEST:
      return {
        signingUp: true,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        signingUp: false,
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        signingUp: false,
        signupErrors: action.errors,
      }
    default:
      return state;
  }
}