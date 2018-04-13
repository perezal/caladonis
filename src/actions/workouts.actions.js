import { workoutsService } from '../services/workouts.service';

export const workoutsActions = {
  fetchWorkouts,
  createWorkout,
  deleteWorkout
};

const requestWorkouts = () => ({
  type: "REQUEST_WORKOUTS"
});

const receiveWorkouts = (data) => ({
  type: "RECEIVE_WORKOUTS",
  payload: data,
});

const workoutsFetchFailure = () => ({
  type: "WORKOUTS_FETCH_FAILURE"
})

function fetchWorkouts() {
  return dispatch => {
    dispatch(requestWorkouts());
    workoutsService.getWorkouts()
      .then(
        data => dispatch(receiveWorkouts(data)),
        error => {
          dispatch(workoutsFetchFailure());
          alert("Unable to fetch workout! " + error);
        }
      );
  }
}

function deleteWorkout(id) {
  return dispatch => {
    workoutsService.deleteWorkout(id)
      .then(
        data => {
          alert("Workout Deleted");
          dispatch(fetchWorkouts());
        },
        error => alert("Error!", error)
      );
  }
}

function createWorkout() {
  return dispatch => {
    // dispatch loader
    workoutsService.createWorkout()
      .then(
        data => {
          alert("Workout Created");
          dispatch(fetchWorkouts());
        },
        error => {
          alert("Error!", error);
        }
      );
  }
}