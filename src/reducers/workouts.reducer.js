const initialState = {
  workouts: [],
};

function addExerciseTo(workout_id, state) {
  state.workouts.forEach( workout => {
    if (workout.id === workout_id) {
      workout.exercises.push({ id:"placeholderid", name:"new exercise", sets:[] });
      console.log(state.workouts);
    }
  });
  return state.workouts;
}

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
    case "WORKOUTS_FETCH_FAILURE":
      return {
        ...state,
        isFetching: false
      }
    case "CREATE_EXERCISE":
      return {
        ...state,
        workouts: addExerciseTo(action.payload, state)
      }
    default:
      return state;
  }
}

export { workouts };