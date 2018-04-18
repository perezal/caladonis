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
    default:
      return state;
  }
}