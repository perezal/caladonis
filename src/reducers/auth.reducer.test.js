import { authentication as reducer } from './auth.reducer';
import { actionTypes } from '../constants/auth.actions';

describe('auth reducer', () => {

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(reducer(undefined, {
      type: actionTypes.LOGIN_REQUEST
    })).toEqual({
      loggingIn: true
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer({
      loggingIn: true
    },
    {
      type: actionTypes.LOGIN_SUCCESS
    })).toEqual({
      loggedIn: true,
      user: undefined
    })
  })

  it('should handle LOGIN_FAILURE', () => {
    expect(reducer({
      loggingIn: true
    },
    {
      type: actionTypes.LOGIN_FAILURE
    })).toEqual({
      loginFailed: true
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(reducer({
      loggedIn: true,
      user: undefined
    },
    {
      type: actionTypes.LOGOUT_SUCCESS
    })).toEqual({

    })
  })

  it('should handle SIGNUP_REQUEST', () => {
    expect(reducer(undefined, {
      type: actionTypes.SIGNUP_REQUEST
    })).toEqual({
      signingUp: true
    })
  })

  it('should handle SIGNUP_SUCCESS', () => {
    expect(reducer({
      signingUp: true
    },
    {
      type: actionTypes.SIGNUP_SUCCESS
    })).toEqual({
      signingUp: false
    })
  })

  it('should handle SIGNUP_FAILURE', () => {
    expect(reducer({
      signingUp: true
    },
    {
      type: actionTypes.SIGNUP_FAILURE
    })).toEqual({
      signingUp: false,
      signupErrors: undefined
    })
  })

})