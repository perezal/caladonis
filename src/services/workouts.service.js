export const workoutsService = {
  getWorkouts,
  saveWorkout,
  deleteWorkout,
  createWorkout
};

const base_url = process.env.NODE_ENV === 'production' ? 'https://api.caladonis.com/workouts/' : 'http://localhost:8000/workouts/';


function getWorkouts() {
  // send token in header
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : "";

  return fetch(base_url, {
    headers: new Headers({
      'Authorization': 'Token ' + token,
    })
  })
    .then(function(response) {
      console.log(response);
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    });
}

function saveWorkout(data) {

  const url = base_url + data.id + "/";
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
      console.log(response);
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });
}

function createWorkout() {
  const url = base_url + "new/";
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
      console.log(response);
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });
}

function deleteWorkout(workoutId) {
  const url = base_url + workoutId + "/";
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
      console.log(response);
      if (!response.ok) {
        return Promise.reject(response);
      }
      return; // no response json to return
    });
}