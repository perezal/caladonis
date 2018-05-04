export const authService = {
  login,
  logout,
}

const base_url = process.env.NODE_ENV === 'production' ? 'https://api.caladonis.com/' : 'http://localhost:8000/';

function login(username, password) {

  const source = base_url + 'login/';

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