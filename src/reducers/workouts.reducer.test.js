import { workouts as reducer } from './workouts.reducer'
import { actionTypes } from '../constants/workouts.actions'
import { actionTypes as authActionTypes } from '../constants/auth.actions'

describe('workouts reducer', () => {

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      workouts: []
    })
  })

  it('should handle REQUEST_WORKOUTS', () => {
    expect(reducer(undefined, {
      type: actionTypes.REQUEST_WORKOUTS
    })).toEqual({
      workouts: [],
      isFetching: true
    })
  })

  it('should handle RECEIVE_WORKOUTS', () => {
    expect(reducer(undefined, {
      type: actionTypes.RECEIVE_WORKOUTS
    })).toEqual({
      workouts: undefined,
      isFetching: false
    })
  })

  it('should handle SAVING_WORKOUT', () => {
    expect(reducer(undefined, {
      type: actionTypes.SAVING_WORKOUT
    })).toEqual({
      workouts: [],
      isSaving: true
    })
  })

  it('should handle SAVING_WORKOUT_DONE', () => {
    expect(reducer(undefined, {
      type: actionTypes.SAVING_WORKOUT_DONE
    })).toEqual({
      workouts: [],
      isSaving: false
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer({
      workouts: ["workouts"]
    },
    {
      type: authActionTypes.LOGIN_SUCCESS
    })).toEqual({
      workouts: []
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(reducer({
      workouts: ["a workout"]
    },
    {
      type: authActionTypes.LOGOUT_SUCCESS
    })).toEqual({
      workouts: []
    })
  })

})