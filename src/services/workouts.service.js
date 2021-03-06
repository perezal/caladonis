export const workoutsService = {
  getWorkouts,
  saveWorkout,
  deleteWorkout,
  createWorkout
};

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.caladonis.com/workouts/' : 'http://localhost:8000/workouts/';


function getWorkouts() {
  // send token in header
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : "";

  return fetch(baseUrl, {
    headers: new Headers({
      'Authorization': 'Token ' + token,
    })
  })
    .then(function(response) {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    });
}

function saveWorkout(data) {

  const url = baseUrl + data.id + "/";
  // send token in header
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : "";

  const requestOptions = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }),
    body: JSON.stringify(data),
  }

  return fetch(url, requestOptions)
    .then(function(response) {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });
}

function createWorkout() {
  const url = baseUrl + "new/";
  // send token in header
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : "";

  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    })
  }

  return fetch(url, requestOptions)
    .then(function(response) {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });
}

function deleteWorkout(workoutId) {
  const url = baseUrl + workoutId + "/";
  // send token in header
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : "";

  const requestOptions = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    })
  }

  return fetch(url, requestOptions)
    .then(function(response) {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return; // no response json to return
    });
}