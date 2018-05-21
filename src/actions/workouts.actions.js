import { workoutsService } from '../services/workouts.service';
import { push } from 'react-router-redux';
import { actionTypes } from '../constants/workouts.actions';

const requestWorkouts = () => ({
  type: actionTypes.REQUEST_WORKOUTS
});

const receiveWorkouts = (data) => ({
  type: actionTypes.RECEIVE_WORKOUTS,
  payload: data,
});

const savingWorkout = () => ({
  type: actionTypes.SAVING_WORKOUT
});

const savingWorkoutDone = () => ({
  type: actionTypes.SAVING_WORKOUT_DONE
})

const workoutsFetchFailure = () => ({
  type: actionTypes.WORKOUTS_FETCH_FAILURE
})

function fetchWorkouts() {
  return dispatch => {
    dispatch(requestWorkouts());

    workoutsService.getWorkouts()
      .then(
        data => dispatch(receiveWorkouts(data)),
        error => {
          dispatch(workoutsFetchFailure());
          if (error === 401) {
            alert("You must log in");
            dispatch(push("/login"));
          } else {
            alert("Unable to find workouts. Please try again later");
          }
        }
      );
  }
}

function saveWorkout(workoutData) {
  return dispatch => {
    dispatch(savingWorkout());

    workoutsService.saveWorkout(workoutData)
      .then(
        data => {
          alert("Workout saved");
          dispatch(savingWorkoutDone());
          dispatch(fetchWorkouts());
        },
        error => {
          alert("Workout not saved", error);
          dispatch(savingWorkoutDone());
        }
      )
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
        error => alert("Error!", error)
      );
  }
}

export const workoutsActions = {
  fetchWorkouts,
  createWorkout,
  deleteWorkout,
  saveWorkout,
};
