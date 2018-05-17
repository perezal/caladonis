export const authService = {
  login,
  logout,
  signup
}

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.caladonis.com/' : 'http://localhost:8000/';

function login(username, password) {

  const source = baseUrl + 'login/';

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
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('username', username);
      }
    });

}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('username');
}

function signup(userData) {
  const source = baseUrl + 'accounts/new/';
  console.log(userData);

  const { username, password, email } = userData;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  }

// fetch is wrapped in a Promise to reject on non-ok responses
  return new Promise((resolve, reject) => {
    let should_reject = false;
    fetch(source, requestOptions)
    .then(response => {
      should_reject = !response.ok;
      return response.json();
    })
    .then(result => {
      should_reject ? reject(result) : resolve(result);
    })
  });
}