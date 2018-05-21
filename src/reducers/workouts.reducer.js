import { actionTypes } from '../constants/workouts.actions';

const initialState = {
  workouts: [],
};

const workouts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_WORKOUTS:
      return {
        ...state,
        workouts: [],
        isFetching: true,
      };
    case actionTypes.RECEIVE_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
        isFetching: false,
      }
    case actionTypes.SAVING_WORKOUT:
      return {
        ...state,
        isSaving: true,
      }
    case actionTypes.SAVING_WORKOUT_DONE:
      return {
        ...state,
        isSaving: false,
      }
    case actionTypes.WORKOUTS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
      }
    case "LOGOUT_SUCCESS":
      return {
        ...initialState,
      }
    default:
      return state;
  }
}

export { workouts };