export const authService = {
  login,
  logout,
}

function login(username, password) {

  const source = 'http://localhost:8000/login/';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(source, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      console.log(user);
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('username', username);
      }
    });

}

function logout() {
  console.log("LOGOUT");
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('username');
}