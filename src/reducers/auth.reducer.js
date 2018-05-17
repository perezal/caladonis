let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state=initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        loggingIn: true,
      };
    case "LOGIN_SUCCESS":
      return {
        loggedIn: true,
        user: action.user
      };
    case "LOGIN_FAILURE":
      return {
        loginFailed: true
      };
    case "LOGOUT":
      return {};
    case "SIGNUP_REQUEST":
      return {
        signingUp: true
      };
    case "SIGNUP_SUCCESS":
      return {
        signingUp: false
      };
    case "SIGNUP_FAILURE":
      return {
        signingUp: false,
        signupErrors: action.errors
      }
    default:
      return state;
  }
}