const initialState = {
  workouts: [],
};

const workouts = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_WORKOUTS":
      return {
        ...state,
        workouts: [],
        isFetching: true,
      };
    case "RECEIVE_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
        isFetching: false
      }
    case "SAVING_WORKOUT":
      return {
        ...state,
        isSaving: true
      }
    case "SAVING_WORKOUT_DONE":
      return {
        ...state,
        isSaving: false
      }
    case "WORKOUTS_FETCH_FAILURE":
      return {
        ...state,
        isFetching: false
      }
    case "LOGIN_SUCCESS":
      return {
        ...initialState
      }
    case "LOGOUT":
      return {
        ...initialState
      }
    default:
      return state;
  }
}

export { workouts };